import React, { useEffect } from 'react'
import {
  CloseButton,
  LeaderboardItem,
  LeaderboardList,
  ModalContentMainContainer,
  ModalOverlay,
} from './styles'
import { Title } from '../../components/GameInstructions/styles'
import useLeaderBoard from '../../hooks/useLeaderBoard'
import LoadingSpinner from '../../components/LoadingSpinner/Index'

interface LeaderBoardModalProps {
  onClose: () => void
}

const LeaderBoardModal: React.FC<LeaderBoardModalProps> = ({ onClose }) => {
  const { leaderBoard, loading, error, fetchLeaderBoard } = useLeaderBoard()

  // Fetch leaderboard data when the modal is opened
  useEffect(() => {
    fetchLeaderBoard()
  }, [fetchLeaderBoard])

  if (loading) {
    return (
      <ModalOverlay>
        <ModalContentMainContainer>
          <CloseButton onClick={onClose}>❌</CloseButton>
          <LoadingSpinner />
        </ModalContentMainContainer>
      </ModalOverlay>
    )
  }

  return (
    <ModalOverlay>
      <ModalContentMainContainer>
        <CloseButton onClick={onClose}>❌</CloseButton>
        <Title>Leaderboard</Title>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <LeaderboardList>
          {leaderBoard.map((player, index) => (
            <LeaderboardItem key={index}>
              <span className="player-name">
                {index + 1}. {player.name}
              </span>
              <span className="player-score">{player.score}</span>
            </LeaderboardItem>
          ))}
        </LeaderboardList>
      </ModalContentMainContainer>
    </ModalOverlay>
  )
}

export default LeaderBoardModal
