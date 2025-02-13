import React from 'react'
import './App.css'
import GameBoard from './containers/GameBoard'
import BgIcon from './components/BgIcon'
import Header from './containers/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <main className="game-board-wrapper">
        <GameBoard />
      </main>
      <BgIcon />
    </div>
  )
}

export default App
