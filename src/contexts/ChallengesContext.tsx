import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'

interface ChallengeProps {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number
  currentXp: number
  challengesCompleted: number
  activeChallenge: ChallengeProps
  xpNextLevel: number
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
}

interface ChallengesProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({}  as ChallengesContextData)

export function ChallengesProvider({ children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentXp, setCurrentXp] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const xpNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() =>{
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('New challenge ', { 
        body: `Win ${challenge.amount} xp!`,
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    
    if (!activeChallenge) return

    const { amount } = activeChallenge

    let finalXp = currentXp + amount

    if (finalXp > xpNextLevel) {
      finalXp -= xpNextLevel
      levelUp()
    }

    setCurrentXp(finalXp)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentXp, 
        challengesCompleted, 
        activeChallenge,
        xpNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}