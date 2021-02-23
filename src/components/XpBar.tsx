import styles from '../styles/components/XpBar.module.css'

export function XpBar () {
  return (
    <header className={styles.xpBar}>
      <span>0 xp</span>

      <div>
        <div style={{width: '60%'}} />

        <span className={styles.currentXp} style={{left: "60%"}}>360 xp</span>
      </div>

      <span>600 xp</span>
    </header>
  )
}

