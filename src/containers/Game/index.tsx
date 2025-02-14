import React, { useState, useEffect, useCallback } from 'react'
import useCards from '../../hooks/useCards'
import MemoryCard from '../../components/MemoryCard'
import { CardInterface } from '../../interfaces/cardsInterfaces'

const Game: React.FC = () => {
  const INITIAL_PAIRS = 4

  /**
   * UseStates
   */
  const [gameCards, setGameCards] = useState<CardInterface[]>([])
  const [selectedCard, setSelectedCard] = useState<CardInterface | null>(null)
  const [hasWon, setHasWon] = useState<boolean>(false)

  /**
   * Hooks
   */
  const { getCards, cards, loading } = useCards()

  /**
   * UseEffects
   */
  useEffect(() => {
    if (cards.length === 0) {
      getCards(INITIAL_PAIRS)
    }
  }, [cards, getCards])

  useEffect(() => {
    setGameCards(cards)
  }, [cards])

  // Check win condition whenever gameCards changes
  useEffect(() => {
    const allMatched = gameCards.every((card) => card.disabled)
    if (allMatched && gameCards.length > 0) {
      setHasWon(true) // Set win flag if all cards are matched
    }
  }, [gameCards])

  /**
   * Handlers
   */
  const handleCardClick = useCallback(
    (card: CardInterface) => {
      // Prevent clicking the same card twice or clicking disabled cards
      if (card.id === selectedCard?.id || card.disabled) {
        return
      }

      // Flip the clicked card
      const updatedCards = gameCards.map((gameCard) =>
        gameCard.id === card.id ? { ...gameCard, isFlipped: true } : gameCard
      )
      setGameCards(updatedCards)

      if (!selectedCard) {
        // If no card is selected, set the clicked card as the selected card
        setSelectedCard(card)
      } else {
        // If a card is already selected, check for a match
        if (card.pairId === selectedCard.pairId) {
          // Match found: disable both cards
          const matchedUpdatedCards = updatedCards.map((gameCard) =>
            gameCard.pairId === card.pairId
              ? { ...gameCard, isFlipped: true, disabled: true }
              : gameCard
          )
          setGameCards(matchedUpdatedCards)
        } else {
          // No match: flip both cards back after a short delay
          setTimeout(() => {
            const resetCards = updatedCards.map((gameCard) =>
              gameCard.id === card.id || gameCard.id === selectedCard.id
                ? { ...gameCard, isFlipped: false }
                : gameCard
            )
            setGameCards(resetCards)
          }, 1000)
        }
        setSelectedCard(null) // Reset the selected card
      }
    },
    [gameCards, selectedCard]
  )

  /**
   * Renders
   */
  const renderGameCards = useCallback(() => {
    return gameCards.map((card) => (
      <div key={`memory-card-${card.id}`}>
        <MemoryCard
          cardData={card}
          onClick={handleCardClick}
          isFlipped={card.isFlipped || false}
          isDisabled={card.disabled || false}
        />
      </div>
    ))
  }, [gameCards, handleCardClick])

  // Main return
  return (
    <div>
      {loading ? (
        <span>Loading...</span>
      ) : hasWon ? (
        <span>Congratulations! You&apos;ve won the game!</span> // Win message
      ) : gameCards.length > 1 ? (
        renderGameCards()
      ) : (
        <span>Error!</span>
      )}
    </div>
  )
}

export default Game
