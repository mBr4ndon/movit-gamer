import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let countDownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext)
  
  const [time, setTime] = useState(5)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60;

  const [minDecimal, minUnit] = String(minutes).padStart(2, '0').split('')
  const [secDecimal, secUnit] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countDownTimeout)
    setIsActive(false)
    setTime(5)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time-1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

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

      { 
        hasFinished ? (
          <button
            disabled
            className={styles.countdownButtton}
          >
            Cicle over
          </button>
        )
        :
        (
          <>
            { isActive ?
              <button 
                type="button" 
                className={`${styles.countdownButtton} ${styles.countdownButttonActive}`}
                onClick={resetCountdown}
              >
                Leave cicle
              </button>
            :
              <button 
                type="button" 
                className={styles.countdownButtton}
                onClick={startCountdown}
              >
                Begin cicle
              </button>
            }
          </>
        )
      }

      
    </div>
  )
}