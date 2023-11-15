import styles from "../../page.module.css"
import Articles from "../../../components/articles/Articles";
import { Suspense } from "react";
import RightMenu from "@/components/rightMenu/RightMenu";

export const metadata = {
  title: 'Recherche par Tags | Apprendre Le Web',
  description: "Explorez le monde du développement web avec des articles captivants et instructifs sur ApprendreLeWeb. Plongez dans des sujets variés, de la programmation aux dernières tendances, pour enrichir vos connaissances et stimuler votre passion pour le web.",
}

async function getArticles() {
    const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/?timestamp=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
}

export default async function page({params}) {
    const articles = await getArticles()
    const tag = (params.tag)
    let filtredArticles = []

    articles.map(article => {
        article.tags.map(articleTags => {
            if(articleTags.toLowerCase() == tag.toLowerCase()){
                filtredArticles.push(article)
            }
        })
    })
    return (
            <main className={styles.mainInRow}>
            <div className={styles.column}>
              <h1 className={styles.h1}>Il y a {filtredArticles.length} articles contenant le tag <span style={{color:'#6d6dec'}}>{tag}</span> :</h1>
              <Suspense fallback={<div className={styles.loadingContainer}><div className={styles.loadingEffect}></div></div>}>
                <Articles articles={filtredArticles} />
              </Suspense>
            </div>
            <div className={styles.rightColumn}>
              <RightMenu articles={articles}/>
            </div>
          </main>
        )
}