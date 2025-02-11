import styles from "../page.module.css";

async function getArticles() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/?timestamp=${Date.now()}`, {
		cache: "no-store",
	});
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export default async function Page() {
	return <main className={styles.main}> Ooops ... Il n&apos;y a rien a voir ici.</main>;
}
