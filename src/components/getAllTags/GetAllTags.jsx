import '@/components/getAllTags/getAllTags.css'
import Link from 'next/link'

async function getArticles() {
    const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/?timestamp=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function GetAllTags() {
    const articles = await getArticles()
    const listOfTags = new Set()

    articles.forEach(article => {
        article.tags.forEach(articleTags => {
          listOfTags.add(articleTags.toLowerCase());
        });
      });
    const uniqueTags = [...listOfTags];
    return (
        <div className="tags-container">
            {uniqueTags.map((tag,index) => (
                <Link key={index} href={`/tags/${tag}`} ><div className="tag-bubble" >{tag}</div></Link>
            ))}
        </div>
    )
}