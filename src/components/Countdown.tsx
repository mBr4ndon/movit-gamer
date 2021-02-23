import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const [time, setTime] = useState(25 * 60)
  const [active, setActive] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60;

  const [minDecimal, minUnit] = String(minutes).padStart(2, '0').split('')
  const [secDecimal, secUnit] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setActive(true)
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time-1)
      }, 1000)
    }
  }, [active, time])

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minDecimal}</span>
          <span>{minUnit}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secDecimal}</span>
          <span>{secUnit}</span>
        </div>      
      </div>

      <button 
        type="button" 
        className={styles.countdownButtton}
        onClick={startCountdown}
      >
        Begin cicle
      </button>
    </div>
  )
}