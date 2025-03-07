import "./article.css";
import styles from "../../page.module.css";
import Link from "next/link";
import Image from "next/image";
import GetModifAndDeletIfConnected from "@/components/article/GetModifAndDeletIfConnected";
import "@/components/articles/articles.css";
import RightMenuSingle from "@/components/rightMenu/RightMenuSingle";
import remarkHeadingId from "remark-heading-id";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

async function getArticle(id) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}?timestamp=${Date.now()}`);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function generateMetadata({ params }) {
	const data = await getArticle(params.id);
	return {
		title: `${data.title} | Apprendre Le Web`,
		desciption: data.content.split("<p>").slice(1).join(" ").split("</p>").slice(0, 1),
	};
}

export default async function page({ params }) {
	const data = await getArticle(params.id);

	var date = data.date.split("-");
	const formatDate = `${date[2]}/${date[1]}/${date[0]}`;
	return (
		<main className={styles.main}>
			<GetModifAndDeletIfConnected />
			<div className="info_article">
				<div className="back_article">
					<Link href="/articles">
						<span className="back-arrow">{`<`}</span> Retour
					</Link>
				</div>
				<div className="date_article">{formatDate}</div>
			</div>
			<div className="info_article">
				<div className="title_article">{data.title}</div>
				<div className="tags_container">
					{data.tags.map((tag, index) => (
						<Link key={`${index}-article-tags`} href={`/tags/${tag}`}>
							<div className="tags_articles"> {tag}</div>
						</Link>
					))}
				</div>
			</div>

			{data.content.charAt(0) === "#" ? (
				<div className="article">
					<div className={styles.column}>
						<div className="image_container">
							<Image fill={true} className="image_article" src={data.imageurl} />
						</div>
						<div className="content_article">
							<Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkHeadingId]}>
								{data.content}
							</Markdown>
						</div>
					</div>
					<div className={styles.rightColumn}>
						<RightMenuSingle />
					</div>
				</div>
			) : (
				<div className="article">
					<div className={styles.column}>
						<div className="image_container">
							<img className="image_article" src={data.imageurl} />
						</div>
						<div className="content_article" dangerouslySetInnerHTML={{ __html: data.content }} />
					</div>
					<div className={styles.rightColumn}>
						<RightMenuSingle />
					</div>
				</div>
			)}
		</main>
	);
}
