export interface CardInterface {
  id: string
  pairId: number
  content: string
  isFlipped?: boolean
  disabled?: boolean
}

export interface CardsResponseInterface {
  data: CardInterface[]
  success: boolean
  message: string
}
