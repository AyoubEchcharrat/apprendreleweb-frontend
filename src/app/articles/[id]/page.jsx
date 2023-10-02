import "./article.css"
import styles from "../../page.module.css"

async function getArticle(id) {
    const res = await fetch(`${process.env.PROD_URL}api/articles/${id}?timestamp=${Date.now()}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
}

export default async function page({params}) {
    const data = await getArticle(params.id)

    function createMarkup() {
        return {__html: data.article};
    }

    return (
        <main className={styles.main}>
            <div className='article' dangerouslySetInnerHTML={createMarkup()} /> 
        </main>
    )
}