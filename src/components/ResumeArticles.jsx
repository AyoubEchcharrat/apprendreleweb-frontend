"use client"

import {useEffect,useState} from 'react'

export default function ResumeArticles({article}) {
    const [screenSize,setScreenSize] = useState(1600)

    useEffect(()=>{
        setScreenSize(window.innerWidth)
        const handleResize = () => {
            setScreenSize(window.innerWidth)
        }
        window.addEventListener("resize",handleResize)
        return (()=> {
            window.removeEventListener("resize",handleResize)
        })
    },[])

    return (
        <div>
            {screenSize > 760 && 
            <div className="content_articles">{article.introduction}</div>
        }
        </div>
    )
}