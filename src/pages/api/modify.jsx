// CA NE MARCHE PAS JUTILISE UNE AUTRE METHODE, A SUPPRIMER

async function getArticle(id) {
    const res = await fetch(`${process.env.PROD_URL}api/articles/${id}?timestamp=${Date.now()}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
}

export async function getServerSideProps(context) {
    const currentArticleId = context.query.id;
    // Récupérez les données depuis votre source de données (base de données, API, etc.)
    const data = await getArticle(currentArticleId);
    
    return {
      props: { data },
    };
  }
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      // Si c'est une requête GET, utilisez getServerSideProps pour récupérer les données
      const { data } = getServerSideProps({ query: req.query });
  
      // Renvoyez les données en tant que réponse
      res.status(200).json(data);
    } else {
      // Traitez les autres méthodes HTTP si nécessaire
      res.status(405).end(); // Méthode non autorisée
    }
  }