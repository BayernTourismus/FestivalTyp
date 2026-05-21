import { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { questions, results, type BayernTypeId } from "./data/quiz";
import { evaluateQuiz, totalQuestions, type ScoreMap } from "./lib/scoring";

const STORAGE_KEY = "festivaltyp-state-v2";
const ANALYTICS_KEY = "festivaltyp-analytics-v1";
const IDLE_TIMEOUT_MS = 30_000;
const RESULT_TIMEOUT_MS = 120_000;
const ANSWER_FEEDBACK_MS = 220;
const CALCULATION_DELAY_MS = 1_700;

type Screen = "attract" | "start" | "quiz" | "calculating" | "result";

type AppState = {
  screen: Screen;
  currentQuestion: number;
  selectedAnswers: number[];
  resultId: BayernTypeId | null;
};

type AnalyticsState = {
  starts: number;
  abandonments: number;
  completions: number;
  resultDistribution: Record<BayernTypeId, number>;
};

const initialState: AppState = {
  screen: "attract",
  currentQuestion: 0,
  selectedAnswers: [],
  resultId: null,
};

const initialAnalytics = (): AnalyticsState => ({
  starts: 0,
  abandonments: 0,
  completions: 0,
  resultDistribution: {
    "franken": 0,
    "oberbayern": 0,
    "ostbayern": 0,
    "allgaeu-bayerisch-schwaben": 0,
  },
});

const readJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const readStoredState = (): AppState => {
  const parsed = readJson<Partial<AppState>>(STORAGE_KEY, initialState);
  const screen: Screen =
    ["attract", "start", "quiz", "calculating", "result"].includes(parsed.screen ?? "") ? (parsed.screen as Screen) : "attract";

  return {
    screen,
    currentQuestion: Math.min(Math.max(parsed.currentQuestion ?? 0, 0), totalQuestions - 1),
    selectedAnswers: Array.isArray(parsed.selectedAnswers) ? parsed.selectedAnswers.slice(0, totalQuestions) : [],
    resultId: parsed.resultId && parsed.resultId in results ? parsed.resultId : null,
  };
};

const readAnalytics = () => readJson<AnalyticsState>(ANALYTICS_KEY, initialAnalytics());

const persistAnalytics = (updater: (current: AnalyticsState) => AnalyticsState) => {
  if (typeof window === "undefined") {
    return;
  }

  const next = updater(readAnalytics());
  window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(next));
};

const recordStart = () => {
  persistAnalytics((current) => ({ ...current, starts: current.starts + 1 }));
};

const recordAbandonment = () => {
  persistAnalytics((current) => ({ ...current, abandonments: current.abandonments + 1 }));
};

const recordCompletion = (resultId: BayernTypeId) => {
  persistAnalytics((current) => ({
    ...current,
    completions: current.completions + 1,
    resultDistribution: {
      ...current.resultDistribution,
      [resultId]: current.resultDistribution[resultId] + 1,
    },
  }));
};

export default function App() {
  const [state, setState] = useState<AppState>(readStoredState);
  const [activeAnswerIndex, setActiveAnswerIndex] = useState<number | null>(null);
  const answerTimerRef = useRef<number | undefined>();

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.screen === "attract") {
      return undefined;
    }

    let timeoutId: number | undefined;

    const resetOnIdle = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(
        () => {
          if (state.screen !== "result" && state.selectedAnswers.length > 0) {
            recordAbandonment();
          }
          setActiveAnswerIndex(null);
          setState(initialState);
        },
        state.screen === "result" ? RESULT_TIMEOUT_MS : IDLE_TIMEOUT_MS,
      );
    };

    const events: Array<keyof WindowEventMap> = ["pointerdown", "pointermove", "keydown", "touchstart"];

    events.forEach((eventName) => window.addEventListener(eventName, resetOnIdle, { passive: true }));
    resetOnIdle();

    return () => {
      window.clearTimeout(timeoutId);
      events.forEach((eventName) => window.removeEventListener(eventName, resetOnIdle));
    };
  }, [state.screen, state.selectedAnswers.length]);

  useEffect(() => {
    if (state.screen !== "calculating" || state.resultId || state.selectedAnswers.length !== totalQuestions) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      const evaluation = evaluateQuiz(state.selectedAnswers);
      recordCompletion(evaluation.resultId);
      setState((current) => ({ ...current, screen: "result", resultId: evaluation.resultId }));
    }, CALCULATION_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [state.resultId, state.screen, state.selectedAnswers]);

  useEffect(() => {
    return () => window.clearTimeout(answerTimerRef.current);
  }, []);

  const currentQuestion = questions[state.currentQuestion];
  const result = state.resultId ? results[state.resultId] : null;
  const progress = Math.round((state.currentQuestion / totalQuestions) * 100);
  const resultScores = useMemo<ScoreMap | null>(() => {
    if (state.resultId || state.selectedAnswers.length === totalQuestions) {
      return evaluateQuiz(state.selectedAnswers).scores;
    }

    return null;
  }, [state.resultId, state.selectedAnswers]);

  const goToStart = () => {
    setState({ ...initialState, screen: "start" });
  };

  const startQuiz = () => {
    recordStart();
    setActiveAnswerIndex(null);
    setState({
      screen: "quiz",
      currentQuestion: 0,
      selectedAnswers: [],
      resultId: null,
    });
  };

  const resetToAttract = () => {
    window.clearTimeout(answerTimerRef.current);
    setActiveAnswerIndex(null);
    setState(initialState);
  };

  const chooseAnswer = (answerIndex: number) => {
    if (activeAnswerIndex !== null) {
      return;
    }

    setActiveAnswerIndex(answerIndex);
    window.clearTimeout(answerTimerRef.current);

    answerTimerRef.current = window.setTimeout(() => {
      const nextAnswers = [...state.selectedAnswers];
      nextAnswers[state.currentQuestion] = answerIndex;
      const nextQuestion = state.currentQuestion + 1;

      setActiveAnswerIndex(null);
      setState({
        screen: nextQuestion >= totalQuestions ? "calculating" : "quiz",
        currentQuestion: Math.min(nextQuestion, totalQuestions - 1),
        selectedAnswers: nextAnswers,
        resultId: null,
      });
    }, ANSWER_FEEDBACK_MS);
  };

  const goBack = () => {
    if (state.currentQuestion === 0) {
      setState({ ...initialState, screen: "start" });
      return;
    }

    setActiveAnswerIndex(null);
    setState((current) => ({
      screen: "quiz",
      currentQuestion: current.currentQuestion - 1,
      selectedAnswers: current.selectedAnswers.slice(0, -1),
      resultId: null,
    }));
  };

  return (
    <main className="app-shell">
      <section className={`experience-frame screen-${state.screen}`}>
        <div className="motion-backdrop" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        {state.screen !== "attract" ?
          <header className="app-header">
            <div className="brand-block">
              <p className="eyebrow">Musik & Tanz in Bayern</p>
              <h1>Welcher Bayern-Typ bist du?</h1>
            </div>
            <button className="ghost-button" onClick={resetToAttract} type="button">
              Reset
            </button>
          </header>
        : null}

        {state.screen === "attract" ?
          <button className="attract-screen" onClick={goToStart} type="button">
            <div className="campaign-loop" aria-hidden="true">
              <span className="loop-line loop-line-one" />
              <span className="loop-line loop-line-two" />
              <span className="loop-line loop-line-three" />
              <span className="loop-pulse" />
            </div>
            <div className="attract-copy">
              <p className="eyebrow">Bayern gehört erlebt</p>
              <h2>Musik. Tanz. Festival-Vibes.</h2>
              <span className="pulse-button">Tippen zum Starten</span>
            </div>
          </button>
        : null}

        {state.screen === "start" ?
          <section className="start-screen">
            <div className="start-copy">
              <p className="eyebrow">60-Sekunden-Quiz</p>
              <h2>Du feierst hier - aber welcher Bayern-Vibe steckt wirklich in dir?</h2>
              <p>Mach das 60-Sekunden-Quiz & finde heraus, welcher Bayern-Typ du bist!</p>
              <strong>Laut. Echt. Bayerisch.</strong>
            </div>
            <button className="primary-button start-button" onClick={startQuiz} type="button">
              okaaay let's go!
            </button>
          </section>
        : null}

        {state.screen === "quiz" && currentQuestion ?
          <section className="question-screen">
            <div className="question-header-panel">
              <div className="question-topline">
                <span>Frage {state.currentQuestion + 1}/5</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-bar" aria-hidden="true">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <h2>{currentQuestion.prompt}</h2>
              <div className="footer-row">
                <button className="secondary-button" onClick={goBack} type="button">
                  Zurück
                </button>
                <p>Antwort antippen, nächste Frage kommt automatisch.</p>
              </div>
            </div>

            <div className="answers-grid">
              {currentQuestion.answers.map((answer, answerIndex) => (
                <button
                  className={`answer-card${activeAnswerIndex === answerIndex ? " is-selected" : ""}`}
                  disabled={activeAnswerIndex !== null}
                  key={answer.option}
                  onClick={() => chooseAnswer(answerIndex)}
                  type="button"
                >
                  <span className="answer-index">{answer.option}</span>
                  <strong>{answer.label}</strong>
                </button>
              ))}
            </div>
          </section>
        : null}

        {state.screen === "calculating" ?
          <section className="calculation-screen" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <h2>Dein Bayern-Vibe wird ermittelt...</h2>
          </section>
        : null}

        {state.screen === "result" && result ?
          <section className="result-screen" style={{ background: result.backdrop }}>
            <article className="result-copy">
              <p className="eyebrow">Dein Bayern-Typ</p>
              <h2>{result.region}</h2>
              <h3>{result.title}</h3>
              <p className="result-vibe">Dein Vibe: {result.vibe}</p>
              <p>{result.description}</p>
            </article>

            <aside className="qr-panel">
              <QRCodeSVG aria-label={`QR-Code: ${result.guideLabel}`} includeMargin level="M" size={240} value={result.guideUrl} />
              <p>{result.guideLabel}</p>
              <a className="primary-button" href={result.guideUrl} rel="noreferrer" target="_blank">
                {result.cta}
              </a>
              <p className="scan-copy">Scannen und deinen Bayern-Typ erleben!</p>
              {resultScores ?
                <dl className="score-list" aria-label="Punktestand">
                  {Object.entries(resultScores).map(([id, score]) => (
                    <div key={id}>
                      <dt>{results[id as BayernTypeId].region}</dt>
                      <dd>{score}</dd>
                    </div>
                  ))}
                </dl>
              : null}
              <button className="secondary-button" onClick={startQuiz} type="button">
                Quiz neu starten
              </button>
            </aside>
          </section>
        : null}
      </section>
    </main>
  );
}
