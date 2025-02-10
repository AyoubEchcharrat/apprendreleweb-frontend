async function getArticles() {
	try {
		const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles`, {
			cache: "no-store",
		});
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.error("Error fetching articles:", error);
		return [];
	}
}

const URL = "https://apprendreleweb.ayoub-echcharrat.fr";

export default async function sitemap() {
	const routes = ["", "/articles", "/about"].map((route) => ({
		url: `${URL}${route}`,
		lastModified: new Date().toISOString(),
	}));

	try {
		const articles = await getArticles();

		if (articles && articles.length > 0) {
			const posts = articles.map(({ _id, date }) => ({
				url: `${URL}/articles/${_id}`,
				lastModified: date,
			}));
			return [...routes, ...posts];
		}
	} catch (error) {
		console.error("Error generating sitemap:", error);
	}

	return routes;
}
