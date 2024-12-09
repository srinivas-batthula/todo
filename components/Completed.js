import React, {useContext} from "react"

import Card from './Card'
import { DataContext } from "./customHooks/DataContext"


export default function Complete(){
    const {tasks, FetchData, completed} = useContext(DataContext)

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


    return(
        <div style={{width:'100vw',height:'100vh', display:'flex', justifyContent:'center', alignContent:'center', alignItems:'center', textAlign:'center', overflowX:'hidden', overflowY:'scroll', scrollbarWidth:'thin', scrollBehavior:'smooth'}}>
            <div style={{marginBottom:'5rem', display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center', textAlign:'center'}}>
                <div style={{fontSize:'1.3rem', fontWeight:'600', textAlign:'center', marginBottom:'0.8rem', marginTop:'0.65rem'}}>Your Completed Tasks : </div>
                {
                    (!tasks || tasks.length===0 || completed!==true) ? <div style={{textAlign:'center', fontSize:'1rem'}}>No Completed Tasks to display</div> : (
                        tasks.map((item, key) => {
                            if(item.status==='completed'){
                                return (
                                    <Card key={key} task_id={item._id} status={item.status} category={item.category} priority={item.priority} task={item.task} handleComplete={handleComplete} handleDelete={handleDelete} />
                                )
                            }
                        })
                    )
                }
            </div>
        </div>
    )
}