import styles from './page.module.css'

import LastArticles from '../components/lastArticles/LastArticles'
import { Suspense } from "react";
import Banner from '../components/banner/Banner'
import Section from '../components/section/Section.jsx'

export default function Page() {

  return (
    <main className={styles.home}>
      <Banner/>
      <Suspense fallback={"...Loading"}>
        <LastArticles/>  
      </Suspense>
      <Section title={"Quelle est la raison d'être de ce site ?"} content={"Je m'interroge fréquemment sur les sujets que je rencontre en développement informatique. C'est pourquoi j'ai pris la décision de créer ce site. Mon objectif est de regrouper toutes ces questions et d'y apporter des réponses à travers des articles. J'espère que ce site sera une ressource précieuse pour toutes les personnes qui se posent les mêmes questions que moi, et qu'il contribuera à éclairer certains des défis que nous rencontrons en développement.\nAu-delà de répondre aux interrogations qui surgissent dans le domaine du développement, ce site représente également ma passion pour le partage de connaissances. J'ai toujours cru en l'importance de la communauté des développeurs, et je souhaite contribuer à son renforcement. En mettant à disposition des articles et des ressources, j'espère créer un espace où les développeurs, qu'ils soient novices ou expérimentés, pourront trouver des réponses, des astuces et des conseils pour progresser dans leur parcours professionnel. Mon aspiration est que ce site devienne un lieu d'apprentissage mutuel et de croissance collective au sein de la communauté du développement."} />
    </main>
  )
}
