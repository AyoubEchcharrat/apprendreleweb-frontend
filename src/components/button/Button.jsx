"use client"

import { useRouter } from 'next/navigation'
import './button.css'

export default function Button({link,content}){
    const router = useRouter()
    return (
    <div className='button-container'>
        {link === "submit" ? 
        <button className='buttonCTA'>{content}</button>
        :
        <button onClick={() => {router.push(`${link}`)}} className='buttonCTA'>{content}</button>
        }
        
        <div className="hover-button"></div>
    </div>

    )
}