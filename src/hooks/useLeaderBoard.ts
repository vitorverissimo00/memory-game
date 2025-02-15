import React from 'react'
import axios, { AxiosResponse, CancelTokenSource } from 'axios'
import {
  LeaderBoardInterface,
  LeaderBoardResponseInterface,
} from '../interfaces/leaderBoardInterfaces'

interface UseLeaderBoardReturn {
  leaderBoard: LeaderBoardInterface[]
  loading: boolean
  error: string | undefined
  fetchLeaderBoard: () => Promise<void>
}

/**
 * Custom hook to fetch leaderboard data
 * @returns {UseLeaderBoardReturn}
 */
const useLeaderBoard = (): UseLeaderBoardReturn => {
  const [leaderBoard, setLeaderBoard] = React.useState<LeaderBoardInterface[]>(
    []
  )
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | undefined>(undefined)

  const fetchLeaderBoard = React.useCallback(async () => {
    setLoading(true)
    setError(undefined)

    let cancelTokenSource: CancelTokenSource | null = null

    try {
      // Create a cancel token source
      cancelTokenSource = axios.CancelToken.source()

      // Fetch leaderboard data
      const response: AxiosResponse<LeaderBoardResponseInterface> =
        await axios.get(`https://memory-game-api-kyls.onrender.com/board`, {
          cancelToken: cancelTokenSource.token,
        })

      if (response.data.success) {
        setLeaderBoard(response.data.data)
      } else {
        throw new Error(
          response.data.message || 'Failed to fetch leaderboard data'
        )
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message)
      } else {
        console.error('Error fetching leaderboard data:', err)
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

  return { leaderBoard, loading, error, fetchLeaderBoard }
}

export default useLeaderBoard
