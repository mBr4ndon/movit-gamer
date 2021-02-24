import Head from 'next/head'

import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { Profile } from '../components/Profile'
import { XpBar } from '../components/XpBar'
import { ChallengeBox } from '../components/ChallengeBox'

import styles from '../styles/pages/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Start | Moveit Gamer</title>
      </Head>

      <XpBar/>

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
    </div>
  )
}
