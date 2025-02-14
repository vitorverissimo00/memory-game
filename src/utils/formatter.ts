import { CardInterface } from '../interfaces/cardsInterfaces'

export const formatCards = (cards: CardInterface[]): CardInterface[] => {
  return cards.map((card) => ({
    ...card,
    isFlipped: false,
    disabled: false,
  }))
}
