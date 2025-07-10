import { useState } from 'react'
import './App.css'
import DigitalClock from './DigitalClock'
import TodoList from './TodoList'

function App() {
  return (
    <div className="app-container">
      <div className="clock-and-timer">
        <DigitalClock />
      </div>
      <TodoList />
    </div>
  )
}

export default App
