import styles from '../styles/pages/Login.module.css'
import { FaGithub, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

export default function Login() {
  return(
    <div className={styles.loginContainer}>

      <div className={styles.formContainer}>
        <img src="/icons/moveit-white.svg" alt="Move it logo"/>

        <h1>Welcome</h1>

        <div className={styles.githubDoLogin}>
          <FaGithub />
          <input type="text" placeholder="Login with GitHub" disabled/>
          <Link href="https://github.com/login/oauth/authorize?client_id=27f548125f8978de4f46">
            <button type="button">
              <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}