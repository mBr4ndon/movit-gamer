import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { Profile } from '../components/Profile'
import { XpBar } from '../components/XpBar'
import { ChallengeBox } from '../components/ChallengeBox'

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'


interface HomeProps {
  level: number
  currentXp: number
  challengesCompleted: number
}

export default function Home(props) {
  return (
    <ChallengesProvider 
      level={props.level} 
      currentXp={props.currentXp}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Home | Moveit Gamer</title>
        </Head>

        <XpBar/>

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />           
            </div>
            
            <div>
              <ChallengeBox />
            </div>

          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentXp, challengesCompleted } = ctx.req.cookies
  
  return {
    props: {
      level: Number(level),
      currentXp: Number(currentXp),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
