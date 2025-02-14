import React from 'react'
import axios, { AxiosResponse } from 'axios'
import {
  CardInterface,
  CardsResponseInterface,
} from '../interfaces/cardsInterfaces'
import { formatCards } from '../utils/formatter'

interface UseCardsReturn {
  cards: CardInterface[]
  loading: boolean
  getCards: (pairs: number) => Promise<void>
}

/**
 * Custom hook to get cards
 * @returns {UseCardsReturn}
 */
const useCards = (): UseCardsReturn => {
  const [cards, setCards] = React.useState<CardInterface[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  const getCards = React.useCallback(async (pairs: number) => {
    setLoading(true)

    try {
      const response: AxiosResponse<CardsResponseInterface> = await axios.get(
        `https://memory-game-api-kyls.onrender.com/cards/?pairs=${pairs}`
      )
      if (response.data.success) {
        setCards(formatCards(response.data.data))
      } else {
        throw new Error(response.data.message)
      }
    } catch (err) {
      console.error('Unexpected error: Error at trying to get cards', err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { cards, loading, getCards }
}

export default useCards
