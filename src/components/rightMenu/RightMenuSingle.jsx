"use client"

import Link from 'next/link'
import './rightMenu.css'
import { useState,useEffect } from 'react'


export default function RightMenuArticles() {
    const [isIDInPage, setIsIdInPage] = useState(false)
    const [IDs, setIDs] = useState([])


    useEffect(() => {
        const elem = document.querySelectorAll('.article [id]') && document.querySelectorAll('.article [id]')
        if(elem) {
            setIDs(elem)
            setIsIdInPage(true)
        }
    },[])

    return (    
        <div className='sticky'>
            {
                isIDInPage ? 
                <div className='right-menu-single-article'>
                    <ul>
                        {
                            Array.from(IDs).map((id,index) => (
                                <Link  key={`id-${index + 1}`} href={`#id${index+1}`}><li>{id.innerText}</li></Link>
                            ))
                        }
                    </ul>
                   
                </div> 
                
                : null
            }

        </div>
    )
}

/* 
<p className='title_rightMenu'>Table des <span style={{color:'#6d6dec'}}>tags</span></p>
            <p className='title_rightMenu'>Article populaire</p> */