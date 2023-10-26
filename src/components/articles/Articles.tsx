import Link from "next/link"
import "./articles.css"

async function getArticles() {
  const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/?timestamp=${Date.now()}`,{next: { revalidate: 300 }})
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

type unArticle = {
    content:string,
    title:string,
    imageurl:string,
    _id:string,
    userId:string,
    tags:string,
    __v:number
}

export default async function Articles() {
    try{
      const data = await getArticles()
      return (
        <div>
            <div className="list-articles">
              {data.map((article:unArticle,index:number) => 
                <Link key={`${index}-article-pageArticles`} href={`articles/${article._id}`}>
                  <div className="container_articles">
                    <div className="image_articles">
                      <img src={article.imageurl} alt="" />
                    </div>
                    <div className="text-container_articles">
                      <h2 className="title_articles">{article.title}</h2>
                      <div className="content_articles"  dangerouslySetInnerHTML={{__html: article.content.split('<p>').slice(1).join(" ").split('</p>').slice(0,1)}}/>
                      <div className="tags_articles">{article.tags}</div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
         
         </div>
      )
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des articles:", error);
      return (
        <div>
          <p>Ooops ... Une erreur s'est produite lors de la récupération des données.</p>
        </div>
      );
    }

}
