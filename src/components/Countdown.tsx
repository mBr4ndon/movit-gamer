import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';



export function Countdown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startCountdown, 
    resetCountdown
  } = useContext(CountdownContext);

  const [minDecimal, minUnit] = String(minutes).padStart(2, '0').split('')
  const [secDecimal, secUnit] = String(seconds).padStart(2, '0').split('')

  
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