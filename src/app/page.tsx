import styles from './page.module.css'
import Image from 'next/image'
import LastArticles from '../components/lastArticles/LastArticles'
import { Suspense } from "react";
import Banner from '../components/banner/Banner'

export default function Page() {

  return (
    <main className={styles.home}>

    <Banner/>

      <Suspense fallback={"...Loading"}>
        <LastArticles/>  
      </Suspense>

    </main>
  )
}
