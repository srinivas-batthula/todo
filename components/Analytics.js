import React, {useState, useEffect, useContext} from "react"
import Link from "next/link"

import { DataContext } from "./customHooks/DataContext"

import styles from '../styles/Analytics.module.css'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export default function Data(){
    const {tasks} = useContext(DataContext)
    const [task, setTask] = useState({'completed':0, 'pending':0})
    const [category, setCategory] = useState({'work':0, 'personal':0, 'other':0})

    const handleData = async() => {
        let temp1 = {'work':0, 'personal':0, 'other':0}
        let temp2 = {'completed':0, 'pending':0}
        if (tasks){
            tasks.map((item)=>{
                if(item.category==='work'){
                    temp1.work += 1
                }
                else if(item.category==='other'){
                    temp1.other += 1
                }
                else{
                    temp1.personal += 1
                }
                if(item.status==='completed'){
                    temp2.completed += 1
                }
                else{
                    temp2.pending += 1
                }
            })
            setCategory(temp1)
            setTask(temp2)
        }
        else{
            console.log('Refresh Failed')
        }
    }

    useEffect(() => { handleData() }, [tasks])     //Fetch tasks on Refresh


    const data = {
        labels: ['work', 'personal', 'other'],
        datasets: [
            {
                label: 'Category tasks',
                data: [category.work, category.personal, category.other],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 3,
                fill: false
            }
        ]
    }
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return(
        <>
            <div className={styles.main}>
                <div style={{textAlign:'center', fontSize:'1.5rem', fontWeight:'600', marginTop:'1rem', textShadow:'-0.2rem 0.1rem 1.5rem'}}>Chart Your Progress </div>
                <div style={{marginBottom:'1.6rem'}}>A Smart Analysis of Your Daily tasks</div>

                <div className={styles.main2}>
                    <div className={styles.box} style={{boxShadow:'0 0 1rem lightgreen'}}>
                        Completed tasks
                        <div className={styles.box1}>{task.completed || 0}</div>
                    </div>
                    <div className={styles.box} style={{boxShadow:'0 0 0.7rem orange'}}>
                        Pending tasks
                        <div className={styles.box1}>{task.pending || 0}</div>
                    </div>
                </div>

                <div className={styles.graph}>
                    {
                        (category.other===0 && category.personal===0 && category.work===0) ? <div style={{fontSize:'1.3rem', letterSpacing:'0.06rem'}}>No stats to display</div> : <Line data={data} options={options} />
                    }
                </div>

                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center', textAlign:'center', marginTop:'2rem', marginBottom:'6.5rem'}}>
                    <div style={{fontSize:'1.3rem', fontWeight:'600', textAlign:'center', marginBottom:'0.6rem'}}>Your Completed Tasks : </div>
                    {
                        (!tasks || tasks.length===0 || task.completed===0) ? "" : ( <Link href='/completed' style={{fontSize:'1.2rem'}}>View Completed Tasks</Link> )
                    }
                </div>

            </div>
        </>
    )
}