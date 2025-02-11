import Link from "next/link";
import "./LastArticles.css";
import "../articles/articles.css";
import ResumeArticles from "../ResumeArticles.jsx";
import Image from "next/image";

async function getArticles() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/?timestamp=${Date.now()}`, {
		cache: "no-store",
	});
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export default async function LastArticles() {
	function formated(article) {
		const dateObj = new Date(article.date);
		const options = { day: "numeric", month: "short", year: "numeric" };
		const formattedDate = new Intl.DateTimeFormat("fr-FR", options).format(dateObj);
		return formattedDate;
	}
	function readTimed(article) {
		const words = article.content.split(" ");
		const readTime = Math.floor(words.length / 200);
		return readTime;
	}

	try {
		const AllData = await getArticles();

		const data = AllData.slice(-3).reverse();
		return (
			<div>
				<div className="container_lastarticles">
					<p className="section_title">Derniers Articles :</p>
					<div className="list_lastarticles">
						{data.map((article, index) => (
							<div key={`${index}-article-home`} className="container_lastarticle">
								<Link href={`/articles/${article._id}`}>
									<div className="image_lastarticle">
										<Image
											fill={true}
											className="imagecover"
											src={article.imageurl}
											alt=""
										/>
									</div>
								</Link>
								<div className="text-container_articles">
									<Link href={`/articles/${article._id}`}>
										<h2 className="title_articles">{article.title}</h2>
									</Link>
									<ResumeArticles article={article} />
									<div className="tags_container">
										{article.tags.map((tag, index) => (
											<Link key={`${index}-article-tags`} href={`/tags/${tag}`}>
												<div className="tags_articles"> {tag}</div>
											</Link>
										))}
									</div>
									<div className="infos_articles">
										<div className="readTime_articles">
											{readTimed(article)} min de lécture &#x2022; &nbsp;
										</div>
										<div className="formatteddate_articles">
											Mis à jour le {formated(article)}{" "}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.log("Une erreur est survenue lors du chargement des données : ", error);
		return <div>Ooops ... Une erreur est survenue lors du chargement des données.</div>;
	}
}
