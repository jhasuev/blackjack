
export const getRandomNum = (min, max) => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export const getCardScore = (cards, name) => {
  const scores = cards.find(card => card.name === name).scores
  return scores[getRandomNum(0, scores.length - 1)]
}

