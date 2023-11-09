"use client"

import styles from '../../app/page.module.css'
import Image from 'next/image'
import { useEffect,useState } from 'react'

export default function Banner() {
  const [screenSize,setScreenSize] = useState(1600)
  const [valeur, setValeur] = useState(77)
  const valueY2 = 47

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
      borderLeft: "dashed silver 1px",
      position: "absolute",
      top: "190px",
      left: "192px",
      fontSize: "7px",
      display: "flex",
      alignItems: "center",
      padding: "4px",
      color:"rgb(223, 223, 223)"
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
            <Image className={styles.catimagehome} priority={true} src="/cat.png" width={310} height={300} alt="subtile draw of cat" />
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
