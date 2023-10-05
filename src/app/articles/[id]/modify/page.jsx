"use client"

import styles from "../../../page.module.css"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";

export default function Modify() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const userToken = useAppSelector((state) => state.authReducer.userToken)
    const pathname = usePathname()
    const currentArticleId = pathname.split('/')[2]

    const URL = 'https://apprendreleweb-backend-61895b6b6b58.herokuapp.com'

    useEffect(()=> {
        fetch(`${URL}/api/articles/${currentArticleId}`)
        .then((res) => res.json())
        .then((article) => {
            console.log(article)
            setData(article)
            setLoading(false)
          })
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e.target.elements[0].value)
        const decoded = e.target.elements[0].value
        const wordsP1 = decoded.split('<h1>')[1];
        const title = wordsP1.split('</h1>')[0];
        const article = {article : decoded, title : title}
        try{
            const config = {
            headers: { 
                'Authorization': 'Bearer ' + userToken
            }
            }
            const data = await axios.put(
            `${URL}/api/articles/${currentArticleId}`,
            article,
            config
            )
            return data
        }
        catch (error){
            console.log({erreur : {error}})
        }
    }

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    return (
        <main className={styles.main} >
            <div>
                <form onSubmit={handleSubmit}>
                    <textarea 
                    id="articleContent" 
                    rows="50" 
                    cols="100"
                    value={data.article}
                    onChange={(e) => setData(e.target.value)}/>
                    <button type="submit">Envoyer</button>
                </form>
            </div>
        </main>
    )
}