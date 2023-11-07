async function getArticles() {
  const res = await fetch(`https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

const URL = "https://apprendreleweb.ayoub-echcharrat.fr";
 
export default async function sitemap() {
  const articles = await getArticles()

  const posts = articles.map(({ _id, date }) => ({
    url: `${URL}/articles/${_id}`,
    lastModified: date,
  }));
 
  const routes = ["", "/articles"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));
 
  return [...routes, ...posts];
}