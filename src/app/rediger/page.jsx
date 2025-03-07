"use client";

import styles from "../page.module.css";
import "./rediger.css";
import React, { useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";

async function sendArticle(article, userToken) {
	try {
		const config = {
			headers: {
				Authorization: "Bearer " + userToken,
			},
		};
		const data = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/`, article, config);
		return data;
	} catch (error) {
		console.log({ erreur: { error } });
	}
}

export default function App() {
	const userToken = useAppSelector((state) => state.authReducer.userToken);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const date = new Date().toISOString().split("T")[0];

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const title = e.target.elements.title.value;
		const content = e.target.elements.content.value;
		const tags = e.target.elements.tags.value.split(",");
		const imageurl = e.target.elements.imageurl.value;
		const introduction = e.target.elements.introduction.value;
		const objectArticle = { title, content, tags, imageurl, date, introduction };
		sendArticle(objectArticle, userToken).then(
			() => {
				setLoading(false);
				window.location.assign("/articles");
			},
			(error) => {
				setLoading(false);
				setError(true);
				console.log({ error });
			}
		);
	};

	return (
		<main className={styles.main}>
			{error ? (
				<div> Une erreur est surevenu ... </div>
			) : (
				<div style={{ width: "100%", height: "100%" }}>
					{loading ? (
						<div className={styles.loadingEffect}></div>
					) : (
						<form className="form" onSubmit={handleSubmit}>
							<div className="column">
								<label htmlFor="title">Titre :</label>
								<input type="text" id="title" name="title" required />
							</div>
							<div className="column">
								<label htmlFor="introduction">Introduction :</label>
								<textarea id="introduction" name="introduction" rows="2" required></textarea>
							</div>
							<div className="column">
								<label htmlFor="content">Contenu :</label>
								<textarea id="content" name="content" rows="4" required></textarea>
							</div>
							<div className="column">
								<label htmlFor="tags">Tags : (séparés par une virgule)</label>
								<input type="text" id="tags" name="tags" />
							</div>
							<div className="column fileloader">
								<label htmlFor="imageurl">Image :</label>
								<input type="text" id="imageurl" name="imageurl" />
							</div>
							<div className="column">
								<label htmlFor="date">Date :</label>
								<input type="date" id="date" name="date" defaultValue={date} />
							</div>
							<button className="button-send_form" type="submit">
								Créer l&apos;article
							</button>
						</form>
					)}
				</div>
			)}
		</main>
	);
}
