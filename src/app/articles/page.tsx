import { NextPage } from "next";
import styles from "../page.module.css"
import { Suspense } from "react";
import Skeleton from 'react-loading-skeleton'
import Articles from "../../components/articles/Articles";


const BlogIndex:NextPage = () => {
    return (    
    <main className={styles.main}>
        <p className={styles.paragraphe}>Bienvenue dans notre espace dédié aux connaissances et à l'exploration. Nos articles regorgent de ressources informatives, de réflexions approfondies et d'insights pertinents. Explorez ces articles pour élargir votre horizon sur divers sujets du monde de la technologie et du développement web.</p>
        <h1 className={styles.h1}>Tous nos articles :</h1>
        <Suspense fallback={<div className={styles.loadingContainer}><div className={styles.loadingEffect}></div></div>}>
            <Articles/>
        </Suspense>
        
    </main>
    )
}

export default BlogIndex