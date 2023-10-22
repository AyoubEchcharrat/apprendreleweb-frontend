"use client"

import styles from "../../../page.module.css"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useReducer, useState } from "react"
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";


async function sendModif(article,userToken,currentArticleId){
    try{
      const config = {
        headers: { 
          'Authorization': 'Bearer ' + userToken
        }
      }
      const data = await axios.put(
        `http://localhost:4000/api/articles/${currentArticleId}`,
        article,
        config
        )
      return data
    }
    catch (error){
      console.log({erreur : {error}})
    }
}
async function deleteArticle(userToken,currentArticleId){
    try{
      const config = {
        headers: { 
          'Authorization': 'Bearer ' + userToken
        }
      }
      const data = await axios.delete(
        `http://localhost:4000/api/articles/${currentArticleId}`,
        config
        )
      return data
    }
    catch (error){
      console.log({erreur : {error}})
    }
}






export default function Modify() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [modified,setModified] = useState(false)
    const userToken = useAppSelector((state) => state.authReducer.userToken)
    const pathname = usePathname()
    const currentArticleId = pathname.split('/')[2]
    const router = useRouter()
    const URL = "http://localhost:4000/"/* 'https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/' */
    const date = new Date().toISOString().split('T')[0]
    useEffect(()=> {
        fetch(`${URL}api/articles/${currentArticleId}`)
        .then((res) => res.json())
        .then((article) => {
            setData(article)
            setLoading(false)
          })
    },[])


    const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      const title = e.target.elements.title.value
      const content = e.target.elements.content.value
      const tags = e.target.elements.tags.value.split(' ')
      if (e.target.elements.imageurl.files[0] !== undefined )
        {
          const imageurl = e.target.elements.imageurl.files[0]
          formData.append("imageurl",imageurl)
        }
      formData.append("title",title)
      formData.append("content",content)
      formData.append("tags",tags)
      formData.append("date", date)
      sendModif(formData,userToken,currentArticleId)
      .then(()=> {  
        setModified(true)  
        window.location.assign('/articles')
      })
      .catch((error) => console.log({error}))
    }

    const handleDelete = async () => {
      deleteArticle(userToken,currentArticleId)
      .then(() => {
        window.location.assign('/articles')
      })
    }
    
    if(loading) return <div className={styles.loadingEffect}></div> 
    if (!data) return <p>No profile data</p>
    return (
        <main className={styles.main} >
          {modified ? <div>Article modifié. </div>: 
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Titre :</label>
                <input type="text" id="title" name="title" required defaultValue={data.title}/>
              </div>
              <div>
                <label htmlFor="content">Contenu :</label>
                <textarea id="content" name="content" rows="4" required defaultValue={data.content}></textarea>
              </div>
              <div>
                <label htmlFor="tags">Tags :</label>
                <input type="text" id="tags" name="tags" defaultValue={data.tags} />
              </div>
              <div>
                <label htmlFor="imageurl">Image :</label>
                <input type="file" id="imageurl" name="imageurl"  accept="image/*"/>
              </div>
              <div>
                <label htmlFor="date">Date :</label>
                <input type="date" id="date" name="date" defaultValue={date} />
              </div>
              <button type="submit">Modifier l'article</button>
              <button onClick={() => handleDelete()}>SUPPRIMER L'ARTICLE</button>
            </form>
          </div>
          }

        </main>
    )
}