import Link from "next/link"
import "./articles.css"
import ResumeArticles from '../ResumeArticles.jsx'


export default async function Articles({articles}) {

  function formated(article){
    const dateObj = new Date(article.date);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(dateObj);
    return formattedDate
  }
  function readTimed(article){
    const words = article.content.split(' ');
    const readTime = Math.floor(words.length / 200)
    return readTime
  }

    try{
      const data = articles.reverse()
      return (
        <div>
            <div className="list-articles">
              {data.map((article,index) => 
                  <div className="container_articles" key={`${index}-article-pageArticles`}>
                    <Link href={`/articles/${article._id}`}>
                      <div className="image_articles">
                        <img src={article.imageurl} alt="" />
                      </div>
                    </Link>
                    <div className="text-container_articles">
                      <Link href={`/articles/${article._id}`}>
                        <h2 className="title_articles">{article.title}</h2>
                      </Link>
                      < ResumeArticles article={article} />
                      <div className="flex_separate">
                        <div className="tags_container">
                          {article.tags.map((tag,index) => (
                            <Link key={`${index}-article-tags`} href={`/tags/${tag}`}><div className="tags_articles"> {tag}</div></Link>
                          ))}
                        </div>
                        <div className="infos_articles">
                          <div className="readTime_articles">{readTimed(article)} min de lécture &#x2022; &nbsp;</div>
                          <div className="formatteddate_articles">Mis à jour le {formated(article)} </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
              )}
            </div>
         
         </div>
      )
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des articles:", error);
      return (
        <div>
          <p>Ooops ... Une erreur s&apos;est produite lors de la récupération des données.</p>
        </div>
      );
    }

}
