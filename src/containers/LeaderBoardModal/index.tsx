import React, { useEffect } from 'react'
import {
  CloseButton,
  LeaderboardItem,
  LeaderboardList,
  ModalContent,
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
        <ModalContent>
          <CloseButton onClick={onClose}>❌</CloseButton>
          <LoadingSpinner />
        </ModalContent>
      </ModalOverlay>
    )
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>❌</CloseButton>
        <Title>Leaderboard</Title>

        {loading && <LoadingSpinner />}
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
      </ModalContent>
    </ModalOverlay>
  )
}

export default LeaderBoardModal
