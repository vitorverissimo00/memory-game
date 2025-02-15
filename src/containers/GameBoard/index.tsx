import React, { useState } from 'react'
import { StartGameButton, StartGameMainContainer } from './styles'
import Card from '../../components/Card'
import GameInstructions from '../../components/GameInstructions'
import Game from '../Game'
import { GAME_STATUS } from '../../types/gameTypes'

interface GameBoardPropsInterface {
  onGameStatusChanged: (status: GAME_STATUS) => void
}

const GameBoard: React.FC<GameBoardPropsInterface> = ({
  onGameStatusChanged,
}) => {
  /**
   * UseStates
   */
  const [isGameStarted, setIsGameStarted] = useState(false)

  /**
   * UseEffects
   */
  React.useEffect(() => {
    if (isGameStarted) {
      onGameStatusChanged(GAME_STATUS.STARTED)
    }
  }, [isGameStarted])

  /**
   * Renders
   */
  const renderStartGame = (): React.ReactElement => (
    <StartGameMainContainer>
      <GameInstructions />
      <StartGameButton onClick={() => setIsGameStarted(true)}>
        Start Game
      </StartGameButton>
    </StartGameMainContainer>
  )

  const renderGame = (): React.ReactElement => (
    <Game
      onCancel={() => {
        onGameStatusChanged(GAME_STATUS.CONCLUDED)
        setIsGameStarted(false)
      }}
    />
  )

  return <Card>{isGameStarted ? renderGame() : renderStartGame()}</Card>
}

export default GameBoard
