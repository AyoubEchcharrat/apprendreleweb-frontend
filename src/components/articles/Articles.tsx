
import axios from "axios"
import Link from "next/link"

async function getArticles() {
  const res = await fetch(`${process.env.PROD_URL}api/articles/?timestamp=${Date.now()}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

type unArticle = {
    article:string,
    title:string,
    _id:string,
    userId:string,
    __v:number
}

export default async function Articles() {
    const data = await getArticles()
    return (
      <div>
          <ul>
            {data.map((article:unArticle,index:number) => <li key={index}><Link href={`articles/${article._id}`}>{article.title}</Link></li>)}
          </ul>
       
       </div>
    )
}
