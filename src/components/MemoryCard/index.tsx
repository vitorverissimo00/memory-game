import React from 'react'
import { MainContainer } from './styles'
import { CardInterface } from '../../interfaces/cardsInterfaces'

interface MemoryCardProps {
  cardData: CardInterface
  onClick: (card: CardInterface) => void
  isFlipped: boolean
  isDisabled: boolean
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  cardData,
  onClick,
  isFlipped,
  isDisabled,
}) => (
  <MainContainer
    onClick={() => onClick(cardData)}
    isFlipped={isFlipped}
    isDisabled={isDisabled}
  >
    {cardData.content}
  </MainContainer>
)

export default MemoryCard
