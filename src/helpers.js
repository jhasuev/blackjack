
export const getRandomNum = (max) => {
  return Math.floor(Math.random() * max)
}

export const getCardScore = (cards, name) => {
  const scores = cards.find(card => card.name === name).scores
  return scores[getRandomNum(scores.length)]
}

