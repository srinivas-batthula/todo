import React, { createContext, useState } from 'react'
import { useRouter } from 'next/router'


export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [tasks, setTasks] = useState([])
    const [completed, setCompleted] = useState(false)

    const router = useRouter()
    const FetchData = async() => {
        try {
            let res = await fetch('https://todo-backend-1-4u6w.onrender.com/api/db/tasks', {
                method: 'GET',
                credentials: 'include',           //To include all cookies (jwt-tokens)......
                headers:{
                    'Content-Type':'application/json'
                },
                // mode:'cors'
            })
            res = await res.json()
            if (res.status === 'success') {
                setCompleted(false)
                setTasks(res.data)
                setUser(res.user)
                // console.log(res.user)
                res.data.map((item)=>{
                    if(item.status==='completed'){
                        setCompleted(true)
                    }
                })
                console.log("Data retrieved...")
            }
            else {
                setUser({})
                setTasks([])
                setCompleted(false)
                console.log('Refresh Failed')
                // setTimeout(() => {
                console.log('Please Login to Continue1')
                router.push('/login')
                // }, 50)
            }
        }
        catch (e) {
            setUser({})
            setTasks([])
            setCompleted(false)
            console.log(e)
            console.log('Please Login to Continue2')
            router.push('/login')
        }
    }

    return (
        <DataContext.Provider value={{ user, tasks, completed, FetchData }}>
            {children}
        </DataContext.Provider>
    )
}
