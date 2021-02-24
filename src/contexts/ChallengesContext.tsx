import { createContext, ReactNode, useState } from 'react'
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

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
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
        resetChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}