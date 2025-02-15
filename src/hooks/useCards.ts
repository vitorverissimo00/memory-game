import React from 'react'
import axios, { AxiosResponse } from 'axios'
import {
  CardInterface,
  CardsResponseInterface,
} from '../interfaces/cardsInterfaces'
import { formatCards } from '../utils/formatter'
import { mock__cards } from '../mocks/cards.mock'

interface UseCardsReturn {
  cards: CardInterface[]
  loading: boolean
  getCards: (pairs: number) => Promise<void>
  error: string | undefined
}

/**
 * Custom hook to get cards
 * @returns {UseCardsReturn}
 */
const useCards = (): UseCardsReturn => {
  const [cards, setCards] = React.useState<CardInterface[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | undefined>(undefined)

  const getCards = React.useCallback(async (pairs: number) => {
    setLoading(true)

    try {
      const response: AxiosResponse<CardsResponseInterface> = await axios.get(
        `https://memory-game-api-kyls.onrender.com/cards/?pairs=${pairs}`
      )
      if (response.data.success) {
        // setCards(formatCards(response.data.data))
        setCards(formatCards(mock__cards))
      } else {
        throw new Error(response.data.message)
      }
    } catch (err) {
      console.error('Unexpected error: Error at trying to get cards', err)
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { cards, loading, getCards, error }
}

export default useCards
