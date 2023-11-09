import styles from "../../page.module.css"

async function getArticles() {
    const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/?timestamp=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
}

export default async function page({params}) {
    const articles = await getArticles()
    const tag = (params.tag)
    let filtredArticles = []

    articles.map(article => {
        article.tags.map(articleTags => {
            for(let articleTag of articleTags){
                console.log(articleTag)
                if(articleTag.toLowerCase() == tag.toLowerCase()){
                    filtredArticles.push(article)
                }
            }
        })
    })
    console.log(filtredArticles)
    return (
        <main className={styles.main} >
            <ul>
                {filtredArticles.map((article,index) => {
                    <li key={index}><Link href={`articles/${article._id}`}>{article.title}</Link></li>
                })}
            </ul>
        </main>)
}