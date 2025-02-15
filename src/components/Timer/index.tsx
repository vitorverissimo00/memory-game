import React, { useState, useEffect } from 'react'
import { TimeDisplay, TimerContainer } from './style'
import { formatTime } from '../../utils/formatter'

interface TimerPropsInterface {
  stop: boolean // Prop to indicate whether the timer should stop
  onStop: (time: string) => void // Callback to handle the elapsed time when the timer stops
}

const Timer: React.FC<TimerPropsInterface> = ({ stop, onStop }) => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  // Effect to handle the timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    // Cleanup the interval when the component unmounts or when isRunning changes
    return () => clearInterval(interval)
  }, [isRunning])

  // Effect to handle the stop prop
  useEffect(() => {
    if (stop) {
      setIsRunning(false) // Stop the timer
      onStop(formatTime(time)) // Call the onStop callback with the elapsed time
    }
  }, [stop, time, onStop])

  return (
    <TimerContainer>
      <TimeDisplay>{formatTime(time)}</TimeDisplay>
    </TimerContainer>
  )
}

export default Timer
