"use client"

import { useRouter } from 'next/navigation'
import './button.css'

export default function Button({link}){
    const router = useRouter()
    return (<div className='button-container'>
        <button onClick={() => {router.push(`${link}`)}} className='buttonCTA'>C&apos;est parti</button>
        <div className="hover-button"></div>
    </div>

    )
}