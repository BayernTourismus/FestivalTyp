import { useEffect, useMemo, useState } from 'react'
import { festivalTypes, questions } from './data/quiz'
import { evaluateQuiz, totalQuestions } from './lib/scoring'

const STORAGE_KEY = 'festivaltyp-demo-state'
const IDLE_TIMEOUT_MS = 45_000

type Screen = 'intro' | 'quiz' | 'result'

type AppState = {
  screen: Screen
  currentQuestion: number
  selectedAnswers: number[]
}

const initialState: AppState = {
  screen: 'intro',
  currentQuestion: 0,
  selectedAnswers: []
}

const readStoredState = (): AppState => {
  if (typeof window === 'undefined') {
    return initialState
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return initialState
    }

    const parsed = JSON.parse(raw) as AppState
    if (!Array.isArray(parsed.selectedAnswers)) {
      return initialState
    }

    return {
      screen: parsed.screen ?? 'intro',
      currentQuestion: parsed.currentQuestion ?? 0,
      selectedAnswers: parsed.selectedAnswers
    }
  } catch {
    return initialState
  }
}

export default function App() {
  const [state, setState] = useState<AppState>(readStoredState)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    let timeoutId: number | undefined

    const resetOnIdle = () => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        setState(initialState)
      }, IDLE_TIMEOUT_MS)
    }

    const events: Array<keyof WindowEventMap> = ['pointerdown', 'pointermove', 'keydown', 'touchstart']

    events.forEach((eventName) => window.addEventListener(eventName, resetOnIdle, { passive: true }))
    resetOnIdle()

    return () => {
      window.clearTimeout(timeoutId)
      events.forEach((eventName) => window.removeEventListener(eventName, resetOnIdle))
    }
  }, [])

  const result = useMemo(() => {
    if (state.selectedAnswers.length !== totalQuestions) {
      return null
    }

    return evaluateQuiz(state.selectedAnswers)
  }, [state.selectedAnswers])

  const currentQuestion = questions[state.currentQuestion]
  const progress = Math.round((state.selectedAnswers.length / totalQuestions) * 100)

  const startQuiz = () => {
    setState({
      screen: 'quiz',
      currentQuestion: 0,
      selectedAnswers: []
    })
  }

  const chooseAnswer = (answerIndex: number) => {
    const nextAnswers = [...state.selectedAnswers]
    nextAnswers[state.currentQuestion] = answerIndex
    const nextQuestion = state.currentQuestion + 1

    setState({
      screen: nextQuestion >= totalQuestions ? 'result' : 'quiz',
      currentQuestion: Math.min(nextQuestion, totalQuestions - 1),
      selectedAnswers: nextAnswers
    })
  }

  const goBack = () => {
    if (state.currentQuestion === 0) {
      setState(initialState)
      return
    }

    setState((current) => ({
      screen: 'quiz',
      currentQuestion: current.currentQuestion - 1,
      selectedAnswers: current.selectedAnswers.slice(0, -1)
    }))
  }

  return (
    <main className="app-shell">
      <section className="device-frame">
        <div className="raute-stage" aria-hidden="true">
          <span className="raute raute-one" />
          <span className="raute raute-two" />
          <span className="raute raute-three" />
          <span className="raute raute-four" />
        </div>

        <header className="app-header">
          <div className="brand-block">
            <p className="eyebrow">Festival Quiz</p>
            <h1>Welcher Festival-Typ passt zu dir?</h1>
          </div>
          <div className="header-actions">
            <button className="ghost-button" onClick={() => setState(initialState)} type="button">
              Reset
            </button>
          </div>
        </header>

        {state.screen === 'intro' ? (
          <section className="hero-card">
            <div className="hero-copy">
              <div className="badge-row">
                <span className="badge">5 Fragen</span>
                <span className="badge">4 Festival-Typen</span>
                <span className="badge">4 Regionen in Bayern</span>
              </div>
              <div className="hero-copy-main">
                <h2>
                  Dein Festival-Vibe.
                  <br />
                  Dein Bayern-Match.
                </h2>
                <p className="lead">
                  Finde in wenigen Schritten heraus, welcher Festival-Typ du bist und welche Region in Bayern zu dir passt.
                </p>
              </div>
              <div className="cta-row intro-actions">
                <p className="hint">Schnell, spielerisch und mit einem klaren Match fuer deinen Festival-Charakter.</p>
                <button className="primary-button" onClick={startQuiz} type="button">
                  Quiz starten
                </button>
              </div>
            </div>

            <div className="hero-sidepanel">
              <div className="hero-sidepanel-head">
                <p className="eyebrow">Typen im Schnellblick</p>
                <p className="panel-copy">Jede Auswertung kombiniert Festival-Persoenlichkeit mit einer passenden Region in Bayern.</p>
              </div>
              <div className="type-preview-grid">
                {Object.values(festivalTypes).map((type) => (
                  <article className="mini-type-card" key={type.id}>
                    <strong>{type.title}</strong>
                    <span>{type.subtitle}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {state.screen === 'quiz' && currentQuestion ? (
          <section className="question-card">
            <div className="question-header-panel">
              <div className="question-topline">
                <span>{currentQuestion.kicker}</span>
                <span>{progress}% abgeschlossen</span>
              </div>
              <div className="progress-bar" aria-hidden="true">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <h2>{currentQuestion.prompt}</h2>
              <p className="question-support">
                Waehle die Antwort, die deinem Gefuehl auf einem Event am naechsten kommt.
              </p>

              <div className="footer-row">
                <button className="secondary-button" onClick={goBack} type="button">
                  Zurueck
                </button>
                <p>
                  Frage {state.currentQuestion + 1} von {totalQuestions}
                </p>
              </div>
            </div>

            <div className="answers-grid">
              {currentQuestion.answers.map((answer, answerIndex) => (
                <button
                  className="answer-card"
                  key={answer.label}
                  onClick={() => chooseAnswer(answerIndex)}
                  type="button"
                >
                  <span className="answer-index">0{answerIndex + 1}</span>
                  <strong>{answer.detail}</strong>
                  <span>{answer.label}</span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {state.screen === 'result' && result ? (
          <section className="result-layout">
            <article className="result-card result-card-primary">
              <p className="eyebrow">Dein Festival-Typ</p>
              <h2>{result.type.title}</h2>
              <p className="result-subtitle">{result.type.subtitle}</p>
              <p>{result.type.description}</p>
            </article>

            <article className="result-card result-card-secondary">
              <p className="eyebrow">Deine Bayern-Region</p>
              <h2>{result.region.title}</h2>
              <p className="result-subtitle">{result.region.subtitle}</p>
              <p>{result.region.description}</p>
            </article>

            <div className="cta-row result-actions">
              <button className="primary-button" onClick={startQuiz} type="button">
                Nochmal spielen
              </button>
              <button className="secondary-button" onClick={() => setState(initialState)} type="button">
                Zur Startseite
              </button>
            </div>
          </section>
        ) : null}
      </section>
    </main>
  )
}
