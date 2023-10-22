import Link from "next/link"
import "./LastArticles.css"
import "../articles/articles.css"


async function getArticles() {
  const res = await fetch(`http://localhost:4000/api/articles/?timestamp=${Date.now()}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}


export default async function LastArticles() {
    const AllData = await getArticles()
    const data = AllData.slice(-3)
    return (
      <div>
          <div className="list-articles">
            {data.map((article,index) => 
              <Link key={`${index}-article-home`} href={`articles/${article._id}`}>
                <div className="container_articles">
                  <div className="image_articles">
                    <img src={article.imageurl} alt="" />
                  </div>
                  <div className="text-container_articles">
                    <h2 className="title_articles">{article.title}</h2>
                    <div className="content_articles" dangerouslySetInnerHTML={{__html: article.content.split('<p>').slice(1).join(" ").split('</p>').slice(0,1)}}/>
                    <div className="tags_articles">{article.tags}</div>
                  </div>
                </div>
              </Link>
            )}
          <p className="section_title" >Derniers Articles :</p>
          </div>
       </div>
    )
}
