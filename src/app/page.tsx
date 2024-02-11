import styles from "./page.module.css";

import LastArticles from "../components/lastArticles/LastArticles";
import { Suspense } from "react";
import Banner from "../components/banner/Banner";
import Button from "@/components/button/Button.jsx";
import Image from "next/image";

export const metadata = {
  title: "Accueil | Apprendre Le Web",
  description:
    "Explorez le monde du développement web avec des articles captivants et instructifs sur ApprendreLeWeb. Plongez dans des sujets variés, de la programmation aux dernières tendances, pour enrichir vos connaissances et stimuler votre passion pour le web.",
};

export default function Page() {
  return (
    <div>
      <main className={styles.home}>
        <Banner />
        <Suspense
          fallback={
            <div className={styles.loadingContainer}>
              <div className={styles.loadingEffect}></div>
            </div>
          }
        >
          <div className={styles.presentation}>
            <div className={styles.partLeft}>
              <h1 className={styles.titlePresentation}>
                Apprenons le Web ensemble
              </h1>
              <h3 className={styles.sublinePresentation}>
                Bienvenue sur mon blog ! Je m&apos;appelle Ayoub, je suis un
                développeur fullstack spécialisé en React et Java.
              </h3>
              <p className={styles.paragraph}>
                En tant que développeur, j&apos;ai consacré des années à créer
                des interfaces conviviales et à donner vie aux applications web.
                Doté d&apos;un sens aigu du détail, je suis constamment à
                l&apos;affût des dernières tendances en développement, et je
                suis ravi de partager mes connaissances et mon expertise avec
                vous.
              </p>
              <p className={styles.paragraph}>
                Sur ce blog, j&apos;aborde divers sujets liés au développement
                de logiciels, en mettant l&apos;accent sur JavaScript, React,
                NextJs, et NodeJs. De temps en temps, j&apos;écris également sur
                la productivité des développeurs.
              </p>
              <Button link="/articles" content="C'est parti" />
            </div>
            <div className={styles.partRight}>
              <Image
                quality={100}
                className={styles.illuPresentation}
                src="/illu-computer.png"
                width={700}
                height={700}
                alt=""
              />
              <Image
                quality={0}
                className={styles.illuShadowPresentation}
                src="/illu-computer.png"
                width={500}
                height={500}
                alt=""
              />
            </div>
          </div>
          <LastArticles />
        </Suspense>
      </main>
    </div>
  );
}
