import {
  festivalTypes,
  questions,
  regions,
  type FestivalTypeId,
  type RegionId,
  type ResultMeta
} from '../data/quiz'

type ScoreMap<T extends string> = Record<T, number>

const initialTypeScores = (): ScoreMap<FestivalTypeId> => ({
  alpenrausch: 0,
  seensucht: 0,
  cityflow: 0,
  waldrausch: 0
})

const initialRegionScores = (): ScoreMap<RegionId> => ({
  allgaeu: 0,
  seenland: 0,
  staedte: 0,
  'bayerischer-wald': 0
})

const typeTieBreakOrder: FestivalTypeId[] = ['alpenrausch', 'seensucht', 'cityflow', 'waldrausch']
const regionTieBreakOrder: RegionId[] = ['allgaeu', 'seenland', 'staedte', 'bayerischer-wald']

const pickWinner = <T extends string>(
  scores: ScoreMap<T>,
  order: T[],
  lookup: Record<T, ResultMeta>
): ResultMeta => {
  const winner = order
    .map((id) => ({ id, score: scores[id] }))
    .sort((left, right) => right.score - left.score || order.indexOf(left.id) - order.indexOf(right.id))[0]

  return lookup[winner.id]
}

export const totalQuestions = questions.length

export const evaluateQuiz = (selectedAnswers: number[]) => {
  const typeScores = initialTypeScores()
  const regionScores = initialRegionScores()

  questions.forEach((question, questionIndex) => {
    const answerIndex = selectedAnswers[questionIndex]
    const answer = question.answers[answerIndex]

    if (!answer) {
      return
    }

    Object.entries(answer.typeScores).forEach(([key, value]) => {
      typeScores[key as FestivalTypeId] += value ?? 0
    })

    Object.entries(answer.regionScores).forEach(([key, value]) => {
      regionScores[key as RegionId] += value ?? 0
    })
  })

  return {
    type: pickWinner(typeScores, typeTieBreakOrder, festivalTypes),
    region: pickWinner(regionScores, regionTieBreakOrder, regions),
    typeScores,
    regionScores
  }
}
