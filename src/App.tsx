import React, { useState, useEffect } from 'react'
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
  const [isComputer, setIsComputer] = useState<boolean>(true)

  // Check if the user is on a computer or mobile device
  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent
        )
      setIsComputer(!isMobile)
    }

    checkDevice()
  }, [])

  const handleGameStatusChanged = (status: GAME_STATUS) => {
    if (status === GAME_STATUS.STARTED) {
      setHeaderVisible(false)
    } else {
      setHeaderVisible(true)
    }
  }

  // If the user is not on a computer, show a message
  const renderComputerMessage = () => (
    <div className="device-restriction-message">
      <h1>This application is only available on computers.</h1>
      <p>Please access this application from a desktop or laptop.</p>
    </div>
  )

  // Render the app if the user is on a computer
  return (
    <div className="App">
      {!isComputer ? (
        renderComputerMessage()
      ) : (
        <>
          {isHeaderVisible && (
            <Header onClickTrophy={() => setIsLeaderBoardModalVisible(true)} />
          )}
          <main className="game-board-wrapper">
            <GameBoard onGameStatusChanged={handleGameStatusChanged} />
          </main>

          <BgIcon />
          {isLeaderBoardModalVisible && (
            <LeaderBoardModal
              onClose={() => setIsLeaderBoardModalVisible(false)}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App
