"use client"

import styles from "../page.module.css"
import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation'
import { loginUser } from "@/redux/features/AuthActions";
import { refreshUserDatas } from "@/redux/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const ConnexionPage = () => {
    const [data,setData] = useState({email:'',password:''})
    const dispatch = useAppDispatch()
    const router = useRouter()
    const userToken = useAppSelector((state) => state.authReducer.userToken)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginUser(data))
    }
    
    useEffect(()=> {
        dispatch(refreshUserDatas())
        if(userToken){
            router.push('/')
        }
    },[dispatch,userToken,router])

    const handleChange = (e) => {
        setData({...data,[e.target.name]: e.target.value })
    }

    return (
        <main className={styles.main}>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} id="email" type="email" name="email" placeholder="Email" required/>
                <input onChange={handleChange} id="password" type="password" name="password" required/>
                <button type="submit">Valider</button>
            </form>
        </main>
    )
}

export default ConnexionPage