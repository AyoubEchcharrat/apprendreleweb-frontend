import styles from './page.module.css'

import LastArticles from '../components/lastArticles/LastArticles'
import { Suspense } from "react";
import Banner from '../components/banner/Banner'
import Head from 'next/head';
import Button from '@/components/button/Button.jsx'

export default function Page() {
  return (
    <div>
      <Head>
      <meta name="google-site-verification" content="x2PAHNdJdspaIbF_yDVwJA57LJpxiiQy6ENeOq6ndYE" />
      </Head>
      <main className={styles.home}>
        <Banner/>
        <Suspense fallback={<div className={styles.loadingContainer}><div className={styles.loadingEffect}></div></div>}>
          <div className={styles.presentation}>
            <div className={styles.partLeft}>
              <h1 className={styles.titlePresentation}>Apprenons le Web ensemble: <br/>
              Le monde du Développement d&apos;Application Web</h1> 
              <h3 className={styles.sublinePresentation}>Bienvenue sur mon blog ! Je m&apos;appelle Ayoub, je suis un développeur Front-End spécialisé React.</h3>
              <p className={styles.paragraph}>En tant que développeur, j&apos;ai consacré des années à créer des interfaces conviviales et à donner vie aux applications web. Doté d&apos;un sens aigu du détail, je suis constamment à l&apos;affût des dernières tendances en développement Front-End, et je suis ravi de partager mes connaissances et mon expertise avec vous.</p>
              <p className={styles.paragraph}>Sur ce blog, j&apos;aborde divers sujets liés au développement de logiciels, en mettant l&apos;accent sur JavaScript, React, Next.Js, Jest et Node.Js. De temps en temps, j&apos;écris également sur la productivité des développeurs.</p>
              <Button link='/articles' />
            </div>
            <div className={styles.partRight}>
              <img className={styles.imagePresentation} src="/blueimage.jpg" alt="" />
            </div>
          </div>
          <LastArticles/>  
        </Suspense>
      </main>
    </div>
  )
}
