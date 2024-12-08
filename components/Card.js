import React from "react"
import Link from 'next/link'

import styles from '../styles/Card.module.css'


export default function Card({ status, category, priority, task_id, task, handleDelete, handleComplete }) {

    return(
        <>
        <div className={status.main}>
            <div className={styles.main2} style={{boxShadow:((status==='pending')?'0 0 0.3rem orange':(status==='completed')?'0 0 0.3rem rgb(57, 199, 57)':'0 0 0.3rem rgb(199, 71, 71)')}}>
                <div className={styles.mark}>
                    <button onClick={()=>handleComplete(task_id)}>
                        <i className="fa-regular fa-circle-check" style={{fontSize:'1.71rem', color:'rgb(48, 197, 34)'}}></i>
                    </button>
                </div>
                <div className={styles.txt}>
                    { task }
                </div>
                <div className={styles.edit}>
                    <Link href={{pathname:'/task_form', query:{ task_id:task_id, category:category, priority:priority, task:task, New:'false' }}} className={styles.Link}>
                        <i className="fa-solid fa-pen-to-square" style={{fontSize:'1.5rem', color:'rgb(0, 195, 255)'}}></i>
                    </Link>
                </div>
                <div className={styles.delete}>
                    <button onClick={()=>handleDelete(task_id)}>
                        <i className="fa-solid fa-trash-can" style={{fontSize:'1.5rem', color:'rgb(207, 43, 43)'}}></i>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}