"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react";

type unArticle = {
  article:string,
  title:string,
  _id:string,
  userId:string,
  __v:number
}

export default function Articles() {
  const [data, setData] = useState([]); // Utilisation de useState pour gérer les données

  useEffect(() => {
    // Utilisation de useEffect pour effectuer la requête au chargement de la page
    async function getAllArticles() {
      try {
        const response = await axios.get(
          `${process.env.PROD_URL}api/articles/?timestamp=${Date.now()}`
        );
        setData(response.data); // Met à jour les données dans l'état
      } catch (error) {
        console.log({ erreur: { error } });
      }
    }

    getAllArticles(); // Appel de la fonction pour récupérer les données
  }, []); // Utilisation d'une dépendance vide pour que cela soit exécuté une seule fois

  return (
      <div>
          <ul>
            {data.map((article:unArticle,index:number) => 
              <li key={index}>
                <Link href={`articles/${article._id}`}>{article.title}</Link>
              </li>)}
          </ul>
       
       </div>
    )
}