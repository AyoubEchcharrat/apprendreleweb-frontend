import "./article.css"
import styles from "../../page.module.css"
import Link from "next/link"
import GetModifAndDeletIfConnected from '@/components/article/GetModifAndDeletIfConnected'

async function getArticle(id) {
    const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/${id}?timestamp=${Date.now()}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
}

export default async function page({params}) {
    const data = await getArticle(params.id)
    function createMarkupContent() {
        return {__html: data.content};
    }
    var date = data.date.split('-')
    const formatDate = `${date[2]}/${date[1]}/${date[0]}`
    return (
        <main className={styles.main}>
            <GetModifAndDeletIfConnected/>
            <div className="info_article">
                <div className="back_article"><Link href='/articles'><span className="back-arrow">{`<`}</span> Retour</Link></div>
                <div className="date_article" >{formatDate}</div>
            </div>
            <div className="info_article">
                <div className="title_article" >{data.title}</div>
                <div className="tags_article" >{data.tags}</div>
            </div>

            <div className='article'>
                <div className="image_container"><img className="image_article" src={data.imageurl}/></div>
                <div className="content_article"  dangerouslySetInnerHTML={createMarkupContent()}/>
            </div>
        </main>
    )
}