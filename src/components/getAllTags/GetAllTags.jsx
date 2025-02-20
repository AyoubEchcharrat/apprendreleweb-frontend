import "@/components/getAllTags/getAllTags.css";
import Link from "next/link";

async function getArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/?timestamp=${Date.now()}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function GetAllTags() {
  const articles = await getArticles();
  const listOfTags = new Set();
  const limit = 20;

  articles.forEach((article) => {
    article.tags.forEach((tag) => listOfTags.add(tag.toLowerCase()));
  });

  const tagsArray = Array.from(listOfTags);

  const shuffledTags = tagsArray.sort(() => Math.random() - 0.5);

  const randomTags = shuffledTags.slice(0, limit);

  return (
    <div className="tags-container">
      {randomTags.map((tag, index) => (
        <Link key={`tag-${index}`} href={`/tags/${tag}`}>
          <div className="tag-bubble">{tag}</div>
        </Link>
      ))}
    </div>
  );
}
