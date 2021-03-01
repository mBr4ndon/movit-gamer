import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'



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
  closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  currentXp: number
  challengesCompleted: number
}

export const ChallengesContext = createContext({}  as ChallengesContextData)

export function ChallengesProvider({ 
  children,
  ...rest
} : ChallengesProviderProps) {

  const [level, setLevel] = useState(rest.level || 1)
  const [currentXp, setCurrentXp] = useState(rest.currentXp || 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)


  const xpNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() =>{
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentXp', String(currentXp))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentXp, challengesCompleted])

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
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
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}