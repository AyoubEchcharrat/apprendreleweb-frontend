import Link from "next/link"
import "./LastArticles.css"
import "../articles/articles.css"
import ResumeArticles from '../ResumeArticles.jsx'

async function getArticles() {
  const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/?timestamp=${Date.now()}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

export default async function LastArticles() {
    try{
      const AllData = await getArticles()
      const data = AllData.slice(-3).reverse()
      return (
          <div>
            <div className="container_lastarticles">
              <p className="section_title" >Derniers Articles :</p>
              <div className="list_lastarticles">
                {data.map((article,index) => 
                  <Link key={`${index}-article-home`} href={`articles/${article._id}`}>
                    <div className="container_lastarticle">
                      <div className="image_lastarticle">
                        <img className="imageW100" src={article.imageurl} alt="" />
                      </div>
                      <div className="text-container_articles">
                        <h2 className="title_articles">{article.title}</h2>
                        < ResumeArticles article={article} />
                        <div className="tags_articles">{article.tags}</div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
      )
    }catch(error){
      console.log("Une erreur est survenue lors du chargement des données : ",error);
      return(
        <div>Ooops ... Une erreur est survenue lors du chargement des données.</div>
      )
    }
    
}
