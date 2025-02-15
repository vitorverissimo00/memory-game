import React from 'react'
import axios, { AxiosResponse, CancelTokenSource } from 'axios'
import {
  CardInterface,
  CardsResponseInterface,
} from '../interfaces/cardsInterfaces'
import { formatCards } from '../utils/formatter'

interface UseCardsReturn {
  cards: CardInterface[]
  loading: boolean
  error: string | undefined
  fetchCards: (pairs: number) => Promise<void>
}

/**
 * Custom hook to fetch cards
 * @returns {UseCardsReturn}
 */
const useCards = (): UseCardsReturn => {
  const [cards, setCards] = React.useState<CardInterface[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | undefined>(undefined)

  const fetchCards = React.useCallback(async (pairs: number) => {
    setLoading(true)
    setError(undefined)

    let cancelTokenSource: CancelTokenSource | null = null

    try {
      // Create a cancel token source
      cancelTokenSource = axios.CancelToken.source()

      // Fetch cards data
      const response: AxiosResponse<CardsResponseInterface> = await axios.get(
        `https://memory-game-api-kyls.onrender.com/cards/?pairs=${pairs}`,
        { cancelToken: cancelTokenSource.token }
      )

      if (response.data.success) {
        setCards(formatCards(response.data.data))
      } else {
        throw new Error(response.data.message || 'Failed to fetch cards')
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message)
      } else {
        console.error('Error fetching cards:', err)
        setError((err as Error).message || 'An unexpected error occurred')
      }
    } finally {
      setLoading(false)
      cancelTokenSource = null // Reset the cancel token source
    }
  }, [])

  // Cleanup function to cancel the request if the component unmounts
  React.useEffect(() => {
    return () => {
      if (axios.CancelToken.source()) {
        axios.CancelToken.source().cancel('Component unmounted')
      }
    }
  }, [])

  return { cards, loading, error, fetchCards }
}

export default useCards
