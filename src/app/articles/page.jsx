import styles from "../page.module.css";
import { Suspense } from "react";
import Articles from "../../components/articles/Articles";
import RightMenuArticles from "@/components/rightMenu/RightMenuArticles";

export const metadata = {
	title: "Articles | Apprendre Le Web",
	description:
		"Explorez le monde du développement web avec des articles captivants et instructifs sur ApprendreLeWeb. Plongez dans des sujets variés, de la programmation aux dernières tendances, pour enrichir vos connaissances et stimuler votre passion pour le web.",
};
async function getArticles() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/`, {
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return { data: await res.json(), error: null };
	} catch (error) {
		console.error("Error fetching articles:", error);
		return {
			data: null,
			error: "Une erreur est survenue lors du chargement des articles. Veuillez réessayer plus tard.",
		};
	}
}

const BlogIndex = async () => {
	const { data: articles, error } = await getArticles();

	if (error) {
		return (
			<main className={styles.main}>
				<section className={styles.FirstBlocPage}>
					<h1 className={styles.h1}>Apprendre le Web grâce à nos articles</h1>
					<p className={styles.paragrapheHeadline}>{error}</p>
				</section>
			</main>
		);
	}

	return (
		<main className={styles.main}>
			<section className={styles.FirstBlocPage}>
				<p className={styles.paragrapheHeadline}>
					Bienvenue dans notre espace dédié aux connaissances et à l&apos;exploration. Nos articles
					regorgent de ressources informatives, de réflexions approfondies et d&apos;insights
					pertinents. Explorez ces articles pour élargir votre horizon sur divers sujets du monde de
					la technologie et du développement web.
				</p>
				<h1 className={styles.h1}>Apprendre le Web grâce à nos articles</h1>
			</section>
			<section className={styles.mainInRow}>
				<div className={styles.column}>
					<Suspense
						fallback={
							<div className={styles.loadingContainer}>
								<div className={styles.loadingEffect}></div>
							</div>
						}
					>
						<Articles articles={articles} />
					</Suspense>
				</div>
				<div className={styles.rightColumn}>
					<RightMenuArticles articles={articles} />
				</div>
			</section>
		</main>
	);
};
export default BlogIndex;
