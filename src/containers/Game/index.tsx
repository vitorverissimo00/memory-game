import React, { useState, useEffect, useCallback } from 'react'
import useCards from '../../hooks/useCards'
import MemoryCard from '../../components/MemoryCard'
import { CardInterface } from '../../interfaces/cardsInterfaces'
import {
  MainContainer,
  WinContainer,
  CardsContainer,
  DescriptionBoardContainer,
  LoadingContainer,
} from './styles'
import { Subtitle, Text, Title } from '../../components/GameInstructions/styles'
import LoadingSpinner from '../../components/LoadingSpinner/Index'
import Timer from '../../components/Timer'
import { StartGameButton } from '../GameBoard/styles'

interface GamePropsInterface {
  onCancel: VoidFunction
  onSendScore: (score: number) => void
}

const Game: React.FC<GamePropsInterface> = ({ onCancel, onSendScore }) => {
  const INITIAL_PAIRS = 10

  /**
   * UseStates
   */
  const [gameCards, setGameCards] = useState<CardInterface[]>([])
  const [clickedCards, setClickedCards] = useState<CardInterface[]>([]) // Track clicked cards
  const [hasWon, setHasWon] = useState<boolean>(false)
  const [elapsedTime, setElapsedTime] = useState<string | null>(null) // Track elapsed time as a string
  const [isClickDisabled, setIsClickDisabled] = useState<boolean>(false) // Prevent rapid clicks
  const [userFinished, setUserFinished] = useState<boolean>(false)
  const [moveCount, setMoveCount] = useState<number>(0) // Track the number of moves

  /**
   * Hooks
   */
  const { fetchCards, cards, loading, error } = useCards()

  /**
   * UseEffects
   */
  useEffect(() => {
    if (cards.length === 0) {
      fetchCards(INITIAL_PAIRS)
    }
  }, [cards, fetchCards])

  useEffect(() => {
    setGameCards(cards)
  }, [cards])

  // Check win condition whenever gameCards changes
  useEffect(() => {
    const allMatched = gameCards.every((card) => card.disabled)

    if (allMatched && gameCards.length > 0) {
      setUserFinished(true)
    }
  }, [gameCards])

  useEffect(() => {
    if (elapsedTime !== null && userFinished) {
      setHasWon(true)
    }
  }, [elapsedTime, userFinished])

  /** Consts */
  const canShowError =
    !hasWon && elapsedTime !== null && gameCards.length < 0 && error
  const canShowWinMessage = hasWon && elapsedTime !== null
  const canShowCards = !hasWon && gameCards.length > 0
  const canShowBoard = !loading && gameCards.length > 0 && !hasWon

  /**
   * Convert time string (HH:MM:SS) to total seconds.
   */
  const parseTimeToSeconds = (time: string): number => {
    const [hours, minutes, seconds] = time.split(':').map(Number)
    return hours * 3600 + minutes * 60 + seconds
  }

  /**
   * Calculate the score based on elapsed time and move count.
   */
  const calculateScore = useCallback((): number => {
    if (elapsedTime === null) return 0

    const maxScore = 1000 // Maximum possible score
    const timeInSeconds = parseTimeToSeconds(elapsedTime) // Convert time to seconds
    const timePenalty = timeInSeconds * 10 // Penalty for time taken
    const movePenalty = moveCount * 5 // Penalty for number of moves

    // Ensure the score doesn't go below 0
    return Math.max(0, maxScore - timePenalty - movePenalty)
  }, [elapsedTime, moveCount])

  /**
   * Handles the logic for when a card is clicked in the memory game.
   */
  const handleCardClick = useCallback(
    (card: CardInterface) => {
      const cardCanBeSelected =
        !isClickDisabled &&
        !card.disabled &&
        !clickedCards.some((c) => c.id === card.id)

      // Update cards
      const updateCards = (atualCards: CardInterface[]): void => {
        setGameCards(atualCards)
        setClickedCards([]) // Reset clicked cards
        setIsClickDisabled(false) // Re-enable clicks
      }

      // Prevent clicks if cards are disabled, during flip animation, or if the card is already clicked
      if (!cardCanBeSelected) {
        return
      }

      // Increment move count
      setMoveCount((prev) => prev + 1)

      // Flip the clicked card
      const updatedCards = gameCards.map((gameCard) =>
        gameCard.id === card.id ? { ...gameCard, isFlipped: true } : gameCard
      )
      setGameCards(updatedCards)

      // Add the clicked card to the clickedCards array
      const newClickedCards = [...clickedCards, card]
      setClickedCards(newClickedCards)

      if (newClickedCards.length === 2) {
        // Disable further clicks while processing
        setIsClickDisabled(true)

        const [firstCard, secondCard] = newClickedCards

        if (firstCard.pairId === secondCard.pairId) {
          // Match found: disable both cards
          const matchedUpdatedCards = updatedCards.map((gameCard) =>
            gameCard.pairId === firstCard.pairId
              ? { ...gameCard, isFlipped: true, disabled: true }
              : gameCard
          )
          updateCards(matchedUpdatedCards)
        } else {
          // No match: flip both cards back after a short delay
          setTimeout(() => {
            const resetCards = updatedCards.map((gameCard) =>
              gameCard.id === firstCard.id || gameCard.id === secondCard.id
                ? { ...gameCard, isFlipped: false }
                : gameCard
            )
            updateCards(resetCards)
          }, 500)
        }
      }
    },
    [gameCards, clickedCards, isClickDisabled]
  )

  const cancelAndGoBack = useCallback(() => {
    // Reset all game-related states
    setGameCards([]) // Clear the game cards
    setClickedCards([]) // Clear the clicked cards
    setHasWon(false) // Reset the win flag
    setElapsedTime(null) // Reset the timer
    setIsClickDisabled(false) // Re-enable clicks
    setMoveCount(0) // Reset move count

    // Optionally, fetch new cards if needed
    onCancel()
  }, [onCancel]) // Add onCancel to the dependency array

  const renderGameCards = useCallback(() => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <CardsContainer
          style={{ width: gameCards.length > 20 ? 'auto' : '30vw' }}
        >
          {gameCards.map((card) => (
            <div key={`memory-card-${card.id}`}>
              <MemoryCard
                cardData={card}
                onClick={handleCardClick}
                isFlipped={card.isFlipped || false}
                isDisabled={card.disabled || false}
              />
            </div>
          ))}
        </CardsContainer>
      </div>
    )
  }, [gameCards, handleCardClick])

  const renderWinningMessage = useCallback(
    () => (
      <WinContainer>
        <Title>Congratulations! You&apos;ve won the game! 🏆</Title>
        <Subtitle>
          Time: {elapsedTime !== null ? elapsedTime : '--:--:--'}
        </Subtitle>
        <StartGameButton
          onClick={() => onSendScore(calculateScore())} // Send the calculated score
        >
          Send Score
        </StartGameButton>
        <StartGameButton onClick={() => cancelAndGoBack()}>
          Exit
        </StartGameButton>
      </WinContainer>
    ),
    [elapsedTime, calculateScore, cancelAndGoBack, onSendScore]
  )

  const renderLoadingMessage = useCallback(
    () => (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    ),
    []
  )

  const renderTimer = () => {
    return (
      <Timer
        stop={userFinished}
        onStop={(time) => setElapsedTime(time)} // Track elapsed time as a string
      />
    )
  }

  const renderErrorMessage = useCallback(
    () => (
      <CardsContainer>
        <Subtitle>Error. Please try again later...</Subtitle>
      </CardsContainer>
    ),
    []
  )

  // loader
  if (loading) return renderLoadingMessage()

  // Main return
  return (
    <MainContainer
      style={{ justifyContent: canShowWinMessage ? 'center' : undefined }}
    >
      {canShowWinMessage && renderWinningMessage()}

      {canShowError && renderErrorMessage()}

      {canShowCards && renderGameCards()}

      {canShowBoard && (
        <DescriptionBoardContainer>
          <Title style={{ marginBottom: '32px' }}>Memory Game</Title>
          {renderTimer()}
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam iste
            autem ea qui dolorem rem eaque odio maxime aut modi atque soluta
            delectus cumque voluptatibus, inventore cupiditate voluptatum.
            Veniam, sed?
          </Text>
          <StartGameButton onClick={() => cancelAndGoBack()}>
            Cancel
          </StartGameButton>
        </DescriptionBoardContainer>
      )}
    </MainContainer>
  )
}

export default Game
