import Link from 'next/link'
import styles from "./page.module.css"

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div style={{display : 'flex',flexDirection:'column', alignItems:'center'}} >
        <h2>404 : Page introuvable</h2>
        <p>Ooops ... La page n&apos;a pas pu être chargée.</p>
        <Link href="/">Retourner à l&apos;accueil</Link>
      </div>
    </main>

  )
}