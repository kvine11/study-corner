import { useState } from 'react'
import './App.css'
import DigitalClock from './DigitalClock'
import TodoList from './TodoList'
import SpotifyPlayer from './SpotifyPlayer'
import SpotifyEmbed from './SpotifyEmbed'

function App() {
  return (
    <div className="app-container">
      <div className="clock-and-timer">
        <DigitalClock />
      </div>
      <TodoList />
      <div className="spotify-section">
        <SpotifyEmbed />
      </div>
    </div>
  )
}

export default App
