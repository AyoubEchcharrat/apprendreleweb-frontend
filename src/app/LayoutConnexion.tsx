"use client"

import Link from "next/link"
import { logout,refreshUserDatas } from "@/redux/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {useEffect,useState} from "react"

export default function LayoutConnexion(){
    const {userToken,dataLoad} = useAppSelector((state) => state.authReducer)
    const dispatch = useAppDispatch();
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        if(dataLoad === false) {
            dispatch(() => refreshUserDatas())
            window.location.reload()
        }
        setIsClient(true)
    },[dataLoad,dispatch,setIsClient])

    return (
        <div>
        {isClient && userToken == null ? 
            <div className="blocConnected">
                <Link className='simulate-bloc' href={'/connexion'}>Connexion</Link>
            </div>
                 :
            <div className="blocConnected">
                <Link href={'/rediger'}>Rédiger</Link>
                <Link href='/' onClick={() => dispatch(logout())}>Deconnexion</Link>
            </div>
        }
        </div>
    )
}