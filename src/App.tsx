import React, { useState } from 'react'
import './App.css'
import GameBoard from './containers/GameBoard'
import BgIcon from './components/BgIcon'
import Header from './containers/Header'
import { GAME_STATUS } from './types/gameTypes'

function App() {
  const [isHeaderVisible, setHeaderVisible] = useState(true)

  const handleGameStatusChanged = (status: GAME_STATUS) => {
    if (status === GAME_STATUS.STARTED) {
      setHeaderVisible(false)
    } else {
      setHeaderVisible(true)
    }
  }

  return (
    <div className="App">
      {isHeaderVisible && <Header />}
      <main className="game-board-wrapper">
        <GameBoard onGameStatusChanged={handleGameStatusChanged} />
      </main>
      <BgIcon />
    </div>
  )
}

export default App
