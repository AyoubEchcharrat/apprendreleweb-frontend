"use client"

require('dotenv').config()
import styles from './page.module.css'
import Image from 'next/image'
import { useEffect,useState } from 'react'

export default function Page() {
  const [valeur, setValeur] = useState(30)
  const valueY2 = 20

  function subline() {
    return "<subline> Exploration Subtile du Monde Web et de ses Langages.</subline>"
  }

  useEffect(() => {
    const interval = setInterval(
      () => setValeur(Math.floor(Math.random() * valueY2 + 30)),
      1500
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const movingLineY2 = {
      height: `${valeur}px`,
      transition: "height .5s ease-in-out",
      borderLeft: "dashed black 1px",
      position: "absolute" as "absolute",
      top: "220px",
      left: "190px",
      fontSize: "8px",
      display: "flex",
      alignItems: "center",
      padding: "4px",
  }

  return (
    <main className={styles.home}>
      <div className={styles.firstcontenthome}>
        <div className={styles.lineanimationx}>190px</div>
        <div className={styles.lineanimationy1}>172px</div>
        <div style={movingLineY2}>{movingLineY2.height}</div>
        <Image className={styles.catimagehome} src="/cat.png" width={467} height={441} alt="subtile draw of cat" />
        <p className={styles.headlinehome}>Cultivez votre curiosité.\n</p>
        <p className={styles.sublinehome}> {subline()} </p>
      </div>

    </main>
  )
}
