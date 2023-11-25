import styles from "../page.module.css"
import { Suspense } from "react";
import Articles from "../../components/articles/Articles";
import RightMenu from '@/components/rightMenu/RightMenu'

export const metadata = {
  title: 'Articles | Apprendre Le Web',
  description: "Explorez le monde du développement web avec des articles captivants et instructifs sur ApprendreLeWeb. Plongez dans des sujets variés, de la programmation aux dernières tendances, pour enrichir vos connaissances et stimuler votre passion pour le web.",
}

async function getArticles() {
    const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/`,{next: { revalidate: 3600 }})
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
  }

const BlogIndex = async () => {
    
    const articles = await getArticles()
    return (    
      <main className={styles.main}>
        <section className={styles.FirstBlocPage}>
        <p className={styles.paragrapheHeadline}>Bienvenue dans notre espace dédié aux connaissances et à l&apos;exploration. Nos articles regorgent de ressources informatives, de réflexions approfondies et d&apos;insights pertinents. Explorez ces articles pour élargir votre horizon sur divers sujets du monde de la technologie et du développement web.</p>
        <h1 className={styles.h1}>Apprendre le Web grâce à nos articles</h1>
        </section>
        <section className={styles.mainInRow}>
          <div className={styles.column}>
            
            
            <Suspense fallback={<div className={styles.loadingContainer}><div className={styles.loadingEffect}></div></div>}>
                <Articles articles={articles}/>
            </Suspense>
          </div>
          <div className={styles.rightColumn}>
            <RightMenu articles={articles}/>
          </div>
        </section>
      </main>
    
    )
}

export default BlogIndex