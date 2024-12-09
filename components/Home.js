import React, { useContext, useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import Card from './Card'

import { DataContext } from "./customHooks/DataContext"


function NoData({opacity, txt}){
    return(
        <>
            <div className={styles.noData} style={{opacity:opacity}}>
                <div className={styles.txt}>
                    { txt }
                </div>
            </div>
        </>
    )
}

export default function Home() {
    const { tasks, completed, FetchData } = useContext(DataContext)

    async function handleComplete(task_id) {
        try {
            let res = await fetch(`https://todo-backend-1-4u6w.onrender.com/api/db/tasks?id=${task_id}`, {
                method: 'PATCH',
                credentials: 'include',      //To include all cookies (jwt-tokens)......
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ 'status': 'completed' })
            })
            res = await res.json()
            if(res.status==='success'){
                console.log("Task Modified...")
            }
            FetchData()      //Gets all tasks & Set's New state in Home
        }
        catch (e) {
            console.log(e)
        }
    }

    async function handleDelete(task_id) {
        try {
            let res = await fetch(`https://todo-backend-1-4u6w.onrender.com/api/db/tasks?id=${task_id}`, {
                method: 'DELETE',
                credentials: 'include',      //To include all cookies (jwt-tokens)......
                headers:{
                    'Content-Type':'application/json'
                },
            })
            res = await res.json()
            if(res.status==='success'){
                console.log("Task Deleted...")
            }
            FetchData()      //Gets all tasks & Set's New state in Home
        }
        catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <div className={styles.main}>
                <div className={styles.card}>
                    <div className={styles.space} style={{position:'fixed'}}>Task Manager</div>
                    <div className={styles.content} style={{marginTop:(!tasks || tasks.length===0 || completed===true) ? '1.6rem':'5rem'}}>
                        {
                            (!tasks || tasks.length===0 || completed===true) ? <NoData opacity={0.65} txt={"No Tasks to display"} /> : (
                                tasks.map((item, key) => {
                                    if(item.status!=='completed'){
                                        return (
                                            <Card key={key} task_id={item._id} status={item.status} category={item.category} priority={item.priority} task={item.task} handleComplete={handleComplete} handleDelete={handleDelete} />
                                        )
                                    }
                                })
                            )
                        }
                    </div>

                    <div >
                        {/* Floating Button */}
                        <Link href={{pathname:'/task_form', query:{ task_id:"", task:"", New:'true' }}}>
                            <div className={styles.floating_btn}>
                                <i className="fa-solid fa-plus" style={{color:"blue", fontSize:'2.15rem'}}></i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            
        </>
    )
}