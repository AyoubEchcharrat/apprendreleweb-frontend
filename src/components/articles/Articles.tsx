"use client"

import axios from "axios"
import Link from "next/link"

async function getAllArticles() {
    try{
      const data = await axios.get(
        `${process.env.PROD_URL}api/articles/`
        )
       return data.data
    }
    catch (error){
      console.log({erreur : {error}})
    }
  }

type unArticle = {
    article:string,
    title:string,
    _id:string,
    userId:string,
    __v:number
}

export default async function Articles() {
    const data = await getAllArticles()
    return (
      <div>
          <ul>
            {data.map((article:unArticle,index:number) => <li key={index}><Link href={`articles/${article._id}`}>{article.title}</Link></li>)}
          </ul>
       
       </div>
    )
}