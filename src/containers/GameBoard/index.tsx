import React, { useState } from 'react'
import { StartGameButton, StartGameMainContainer } from './styles'
import Card from '../../components/Card'
import GameInstructions from '../../components/GameInstructions'
import Game from '../Game'

const GameBoard: React.FC = () => {
  /**
   * UseStates
   */
  const [isGameStarted, setIsGameStarted] = useState(false)

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

  const renderGame = (): React.ReactElement => <Game />

  return <Card>{isGameStarted ? renderGame() : renderStartGame()}</Card>
}

export default GameBoard
