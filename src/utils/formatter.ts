import { CardInterface } from '../interfaces/cardsInterfaces'

export const formatCards = (cards: CardInterface[]): CardInterface[] => {
  return cards.map((card) => ({
    ...card,
    isFlipped: false,
    disabled: false,
  }))
}

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(2, '0')}`
}
