import React, { createContext, useState } from 'react';
import { useRouter } from 'next/router'


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [tasks, setTasks] = useState([])

    const router = useRouter()
    const FetchData = async() => {
        try {
            let res = await fetch('http://localhost:8080/api/db/tasks', {
                method: 'GET',
                credentials: 'include'      //To include all cookies (jwt-tokens)......
                // mode:'cors'
            })
            res = await res.json()
            if (res.status === 'success') {
                setTasks(res.data)
                setUser(res.user)
                console.log("Data retrieved...")
            }
            else {
                setUser({})
                setTasks([])
                console.log('Refresh Failed')
                if (res.Auth === false) {
                    setTimeout(() => {
                        console.log('Please Login to Continue')
                        router.push('/login')
                    }, 500)
                }
            }
        }
        catch (e) {
            setUser({})
            setTasks([])
            console.log(e)
        }
    }

    return (
        <DataContext.Provider value={{ user, tasks, FetchData }}>
            {children}
        </DataContext.Provider>
    )
}
