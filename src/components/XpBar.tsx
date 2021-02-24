import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/XpBar.module.css'

export function XpBar () {
  const { currentXp, xpNextLevel } = useContext(ChallengesContext)

  const progress = Math.round(currentXp * 100) / xpNextLevel 
  return (
    <header className={styles.xpBar}>
      <span>0 xp</span>

      <div>
        <div style={{width: `${progress}%`}} />

        <span className={styles.currentXp} style={{left: `${progress}%`}}>{currentXp} xp</span>
      </div>

      <span>{xpNextLevel} xp</span>
    </header>
  )
}

