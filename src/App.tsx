import React, { useState } from 'react'
import './App.css'
import GameBoard from './containers/GameBoard'
import BgIcon from './components/BgIcon'
import Header from './containers/Header'
import { GAME_STATUS } from './types/gameTypes'
import LeaderBoardModal from './containers/LeaderBoardModal'

function App() {
  const [isHeaderVisible, setHeaderVisible] = useState<boolean>(true)
  const [isLeaderBoardModalVisible, setIsLeaderBoardModalVisible] =
    useState<boolean>(false)

  const handleGameStatusChanged = (status: GAME_STATUS) => {
    if (status === GAME_STATUS.STARTED) {
      setHeaderVisible(false)
    } else {
      setHeaderVisible(true)
    }
  }

  return (
    <div className="App">
      {isHeaderVisible && (
        <Header onClickTrophy={() => setIsLeaderBoardModalVisible(true)} />
      )}
      <main className="game-board-wrapper">
        <GameBoard onGameStatusChanged={handleGameStatusChanged} />
      </main>

      <BgIcon />
      {isLeaderBoardModalVisible && (
        <LeaderBoardModal onClose={() => setIsLeaderBoardModalVisible(false)} />
      )}
    </div>
  )
}

export default App
