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
}

const Game: React.FC<GamePropsInterface> = ({ onCancel }) => {
  const INITIAL_PAIRS = 10

  /**
   * UseStates
   */
  const [gameCards, setGameCards] = useState<CardInterface[]>([])
  const [clickedCards, setClickedCards] = useState<CardInterface[]>([]) // Track clicked cards
  const [hasWon, setHasWon] = useState<boolean>(false)
  const [elapsedTime, setElapsedTime] = useState<string | null>(null)
  const [isClickDisabled, setIsClickDisabled] = useState<boolean>(false) // Prevent rapid clicks
  const [userFinished, setUserFinished] = useState<boolean>(false)

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
  }, [elapsedTime])

  useEffect(() => {
    if (hasWon) {
      console.log('User has won!', elapsedTime)
    }
  }, [hasWon])

  /** Consts */
  const canShowError =
    !hasWon && elapsedTime !== null && gameCards.length < 0 && error
  const canShowWinMessage = hasWon && elapsedTime !== null
  const canShowCards = !hasWon && gameCards.length > 0
  const canShowBoard = !loading && gameCards.length > 0 && !hasWon

  /**
   * Handles the logic for when a card is clicked in the memory game.
   *
   * This function manages the flipping of cards, checking for matches, and updating the game state accordingly.
   * It prevents further clicks while cards are being processed and ensures that matched cards are disabled.
   *
   * @param {CardInterface} card - The card that was clicked.
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

  const cancelAndGoBack = () => {
    // Reset all game-related states
    setGameCards([]) // Clear the game cards
    setClickedCards([]) // Clear the clicked cards
    setHasWon(false) // Reset the win flag
    setElapsedTime(null) // Reset the timer
    setIsClickDisabled(false) // Re-enable clicks

    // Optionally, fetch new cards if needed
    onCancel()
  }

  /**
   * Renders
   */
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
        <StartGameButton onClick={() => cancelAndGoBack()}>
          Exit
        </StartGameButton>
      </WinContainer>
    ),
    [elapsedTime]
  )

  const renderLoadingMessage = useCallback(
    () => (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    ),
    [loading]
  )

  const renderTimer = () => {
    return <Timer stop={userFinished} onStop={(time) => setElapsedTime(time)} />
  }

  const renderErrorMessage = useCallback(
    () => (
      <CardsContainer>
        <Subtitle>Error. Please try again later...</Subtitle>
      </CardsContainer>
    ),
    [loading]
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
