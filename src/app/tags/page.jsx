async function getArticles() {
    const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/?timestamp=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
}

export default async function Page() {

    return (
        <div>
           
        </div>
        )
}



