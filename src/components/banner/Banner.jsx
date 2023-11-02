"use client"

import styles from '../../app/page.module.css'
import Image from 'next/image'
import { useEffect,useState } from 'react'

export default function Banner() {
  const [screenSize,setScreenSize] = useState(1600)
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
      position: "absolute",
      top: "220px",
      left: "190px",
      fontSize: "8px",
      display: "flex",
      alignItems: "center",
      padding: "4px",
  }

  useEffect(() => {
    setScreenSize(window.innerWidth)
    const handleResize = () => {
        setScreenSize(window.innerWidth)
    }
    window.addEventListener('resize',handleResize)
    return () => {
        window.removeEventListener('resize',handleResize)
    }
  },[])

  return (
      <div style={{background:' white'}}>
        { screenSize > 1323 ? 
          <div className={styles.firstcontenthome}>
            <div className={styles.lineanimationx}>190px</div>
            <div className={styles.lineanimationy1}>172px</div>
            <div style={movingLineY2}>{movingLineY2.height}</div>
            <Image className={styles.catimagehome} priority={true} src="/cat.png" width={467} height={441} alt="subtile draw of cat" />
            <p className={styles.headlinehome}>Cultivez votre curiosité.\n</p>
            <p className={styles.sublinehome}> {subline()} </p>
          </div>
          :
          <div className={styles.firstcontenthome}>
            <Image className={styles.catimagehome} priority={true} src="/cat.png" width={180} height={160} alt="subtile draw of cat" />
            <p className={styles.headlinehome}>Cultivez votre curiosité.\n</p>
            <p className={styles.sublinehome}> {subline()} </p>
          </div>
        }
      </div>
     
    )
}
