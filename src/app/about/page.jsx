import styles from "../page.module.css"
import Section from '../../components/section/Section.jsx'

export const metadata = {
    title: 'À propos | Apprendre Le Web',
    description: "Explorez le monde du développement web avec des articles captivants et instructifs sur ApprendreLeWeb. Plongez dans des sujets variés, de la programmation aux dernières tendances, pour enrichir vos connaissances et stimuler votre passion pour le web.",
  }

const Page = () => {
    return (    
    <main className={styles.main}>
        <Section title={"Qui suis-je ?"} content={"Je suis un jeune développeur et designer web, passionné par l'informatique et la création numérique. Mon parcours a débuté avec des études en informatique, où j'ai acquis des compétences solides en développement front-end, notamment en React. En parallèle, j'ai exploré le développement back-end avec Node.js, élargissant ainsi ma gamme de compétences techniques."} />
        <Section title={"Apprendre Le Web ?"} content={"Je m'interroge fréquemment sur les sujets que je rencontre en développement informatique. C'est pourquoi j'ai pris la décision de créer ce site. Mon objectif est de regrouper toutes ces questions et d'y apporter des réponses à travers des articles. J'espère que ce site sera une ressource précieuse pour toutes les personnes qui se posent les mêmes questions que moi, et qu'il contribuera à éclairer certains des défis que nous rencontrons en développement.\nAu-delà de répondre aux interrogations qui surgissent dans le domaine du développement, ce site représente également ma passion pour le partage de connaissances. J'ai toujours cru en l'importance de la communauté des développeurs, et je souhaite contribuer à son renforcement. En mettant à disposition des articles et des ressources, j'espère créer un espace où les développeurs, qu'ils soient novices ou expérimentés, pourront trouver des réponses, des astuces et des conseils pour progresser dans leur parcours professionnel. Mon aspiration est que ce site devienne un lieu d'apprentissage mutuel et de croissance collective au sein de la communauté du développement."} />
    </main>
    )
}

export default Page