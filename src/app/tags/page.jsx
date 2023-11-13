import styles from "../page.module.css"

async function getArticles() {
    const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/?timestamp=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
}

export default async function Page() {

    return <main className={styles.main} > Ooops ... Il n&apos;y a rien a voir ici.</main>
}



