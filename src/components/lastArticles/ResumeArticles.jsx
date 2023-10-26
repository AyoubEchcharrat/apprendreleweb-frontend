"use client"

import {useEffect,useState} from 'react'

export default function ResumeArticles({article}) {
    const [screenSize,setScreenSize] = useState(1600)

    useEffect(()=>{
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
            <div className="content_articles" dangerouslySetInnerHTML={{__html: article.content.split('<p>').slice(1).join(" ").split('</p>').slice(0,1)}}/>
        }
        </div>
    )
}