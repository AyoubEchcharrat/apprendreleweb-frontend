"use client"

import { useAppSelector } from "@/redux/hooks";
import { useRouter,usePathname  } from "next/navigation";
import { useEffect, useState } from "react"


export default function GetModifAndDeletIfConnected() {
    const [isAdmin, setIsAdmin] = useState(false)
    const userToken = useAppSelector((state) => state.authReducer.userToken)
    const router = useRouter()
    const pathname = usePathname()
    useEffect(()=> {
        if (userToken) {
            setIsAdmin(true)
        }
    },[])

    function modify() {
        router.push(`${pathname}/modify`)
    }

    return (
        <div className="connected-container">
            { isAdmin ? 
                <button onClick={modify}>Modifier</button>
                :
                null
            }
        </div>
    )


}