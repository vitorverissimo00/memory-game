import React from 'react'
import './App.css'
import GameBoard from './containers/GameBoard'
import BgIcon from './components/BgIcon'
import Header from './containers/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ zIndex: 2 }}>
        <GameBoard />
      </div>
      <BgIcon />
    </div>
  )
}

export default App
