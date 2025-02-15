import React from 'react'
import {
  MainContainer,
  CardInner,
  CardFront,
  CardBack,
  CardShadow,
} from './styles'
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
    onClick={() => !isDisabled && onClick(cardData)}
    $isDisabled={isDisabled}
    className="prevent-select"
  >
    <CardShadow $isFlipped={isFlipped} />
    <CardInner $isFlipped={isFlipped}>
      <CardFront $isDisabled={isDisabled}>?</CardFront>
      <CardBack>{cardData.content}</CardBack>
    </CardInner>
  </MainContainer>
)

export default MemoryCard
