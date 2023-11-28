"use client"

import styles from "../../../page.module.css"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import '../../../rediger/rediger.css'

async function sendModif(article,userToken,currentArticleId){
    try{
      const config = {
        headers: { 
          'Authorization': 'Bearer ' + userToken
        }
      }
      const data = await axios.put(
        `https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/${currentArticleId}`,
        article,
        config
        )
      return data
    }
    catch ({error}){
      console.log({erreeur : {error}})
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
        `https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/api/articles/${currentArticleId}`,
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
    const URL = "https://apprendreleweb-backend-61895b6b6b58.herokuapp.com/"
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
      const title = e.target.elements.title.value
      const content = e.target.elements.content.value
      const tags = e.target.elements.tags.value.split(',')
      const imageurl = e.target.elements.imageurl.value
      const introduction = e.target.elements.introduction.value
      const objectArticle = {title,content,tags,imageurl,date,introduction}

      sendModif(objectArticle,userToken,currentArticleId)
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
    
    if(loading) return <main className={styles.main}><div className={styles.loadingEffect}></div> </main>
    if (!data) return <main className={styles.main}><p>No profile data</p></main>
    return (
        <main className={styles.main} >
          {modified ? <div>Article modifié. </div>: 
          <div>
            <form className='form' onSubmit={handleSubmit}>
            <div className='column'>
                <label htmlFor="title">Titre :</label>
                <input type="text" id="title" name="title" required defaultValue={data.title}/>
              </div>
              <div className='column'>
                <label htmlFor="introduction">Introduction :</label>
                <textarea id="introduction" name="introduction" rows="2" required defaultValue={data.introduction}></textarea>
              </div>
              <div className='column'>
                <label htmlFor="content">Contenu :</label>
                <textarea id="content" name="content" rows="4" required defaultValue={data.content}></textarea>
              </div>
              <div className='column'>
                <label htmlFor="tags">Tags : (séparé par une virgule)</label>
                <input type="text" id="tags" name="tags" defaultValue={data.tags} />
              </div>
              <div className='column fileloader'>
                <label htmlFor="imageurl">URL de l&apos;image :</label>
                <input type="text" id="imageurl" name="imageurl" defaultValue={data.imageurl} />
              </div>
              <div className='column'>
                <label htmlFor="date">Date :</label>
                <input type="date" id="date" name="date" defaultValue={date} />
              </div>
              <div>
                <button className="button-send_form"  type="submit">Modifier l&apos;article</button>
                <button className="button-delete_form" onClick={() => handleDelete()}>SUPPRIMER L&apos;ARTICLE</button>
              </div>
            </form>
          </div>
          }

        </main>
    )
}