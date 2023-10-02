require('dotenv').config()
import styles from './page.module.css'
import Image from 'next/image'

export default function Page() {

  function subline() {
    return "<subline> Exploration Subtile du Monde Web et de ses Langages.</subline>"
  }

  return (
    <main className={styles.home}>
      <div className={styles.firstcontenthome}>
        <div className={styles.lineanimationx}>190px</div>
        <div className={styles.lineanimationy1}>172px</div>
        <div className={styles.lineanimationy2}>40px</div>
        <Image className={styles.catimagehome} src="/cat.png" width={467} height={441} alt="subtile draw of cat" />
        <p className={styles.headlinehome}>Cultivez votre curiosité.\n</p>
        <p className={styles.sublinehome}> {subline()} </p>
      </div>

    </main>
  )
}
