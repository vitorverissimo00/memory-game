import React, { useState } from 'react'
import {
  StartGameButton,
  StartGameMainContainer,
  ModalContentContainer,
} from './styles'
import Card from '../../components/Card'
import GameInstructions from '../../components/GameInstructions'
import Game from '../Game'
import { GAME_STATUS } from '../../types/gameTypes'
import { CloseButton, ModalOverlay } from '../LeaderBoardModal/styles'
import SendScoreForm from '../../components/SendScoreForm'
import useLeaderBoard from '../../hooks/useLeaderBoard'
import LoadingSpinner from '../../components/LoadingSpinner/Index'
import { Subtitle } from '../../components/GameInstructions/styles'

interface GameBoardPropsInterface {
  onGameStatusChanged: (status: GAME_STATUS) => void
}

const GameBoard: React.FC<GameBoardPropsInterface> = ({
  onGameStatusChanged,
}) => {
  /**
   * UseStates
   */
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [isSendModalVisible, setIsSendModalVisible] = useState<boolean>(false)
  const [userScore, setUserScore] = useState<number>(0)
  /**
   * Hooks
   */
  const { sendScore, loading, error } = useLeaderBoard()

  /**
   * UseEffects
   */
  React.useEffect(() => {
    if (isGameStarted) {
      onGameStatusChanged(GAME_STATUS.STARTED)
    }
  }, [isGameStarted, onGameStatusChanged])

  const handleSendScore = async ({ name }: { name: string }) => {
    await sendScore(name, userScore) // Use the tracked userScore
    setIsSendModalVisible(false) // Close the modal after submission
    setIsGameStarted(false)
    onGameStatusChanged(GAME_STATUS.CONCLUDED)
  }

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

  const renderSendModal = () => {
    return (
      <ModalOverlay>
        <ModalContentContainer>
          <CloseButton onClick={() => setIsSendModalVisible(false)}>
            ❌
          </CloseButton>

          {/* Show loading spinner while submitting */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <SendScoreForm
              onSend={(formData: { name: string }) => handleSendScore(formData)}
            />
          )}

          {/* Display error message if there's an error */}
          {error && <Subtitle style={{ marginTop: '10px' }}>{error}</Subtitle>}
        </ModalContentContainer>
      </ModalOverlay>
    )
  }

  const renderGame = (): React.ReactElement => (
    <Game
      onCancel={() => {
        onGameStatusChanged(GAME_STATUS.CONCLUDED)
        setIsGameStarted(false)
      }}
      onSendScore={(score: number) => {
        setUserScore(score) // Set the user's score when the game ends
        setIsSendModalVisible(true) // Show the send score modal
      }}
    />
  )

  return (
    <Card>
      {isGameStarted ? renderGame() : renderStartGame()}
      {isSendModalVisible && renderSendModal()}
    </Card>
  )
}

export default GameBoard
