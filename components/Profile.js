import React, { useContext } from "react"
import Link from "next/link"
import {useRouter} from "next/router"

import styles from '../styles/Profile.module.css'

import { DataContext } from "./customHooks/DataContext"
import { ThemeContext } from "./customHooks/ThemeContext"


export default function Profile() {
    const {user} = useContext(DataContext)
    const {toggleTheme} = useContext(ThemeContext)
    const router = useRouter()

    async function subscribeToNotifications() {
        askNotificationPermission();
        console.log("Registering Push...")
        const publicVapidKey = urlBase64ToUint8Array('BFyexFkL9PxAuWdy0Izkm0V6i04z8-JvDlYv51N0wOXVSvJnjXWuAPRNP9LXjXSyiOo6z_a3DQBQZzJ9tijXXnw');
        console.log("PublicKey converted to Uint8Array...")
    
        let subscription;
        try{
            let registration = await navigator.serviceWorker.ready
            subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicVapidKey // Replace with your VAPID public key
        });
        console.log("Push Registered...");
        }
        catch(err){
            console.log("Error while registering Push : "+err);
        }
    
        try {
            let r = await fetch(`https://todo-backend-1-4u6w.onrender.com/api/db/users?userId=${user.user_id}`, {
                method: 'PATCH',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({'subscription':subscription})
            })
            r = await r.json()
            if(r.status==='success'){
                console.log('User is subscribed to notifications...')
            }
            else{
                console.log("An error occurred while Sending Notification : ")
            }
        }
        catch (err) {
            console.log("Error : " + err)
        }
    }
    
    //Method for public vapid key conversion...
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
    
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    
    function askNotificationPermission() {
        // Check if the browser supports notifications
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications.');
            return;
        }
    
        // Check the current permission status
        if (Notification.permission === 'granted') {
            console.log('User has already granted permission.');
            return;
        }
    
        if (Notification.permission === 'denied') {
            console.log('User has denied notifications.');
            return;
        }
    
        // Request permission from the user
        Notification.requestPermission().then(async (permission) => {
            if (permission === 'granted') {
                console.log('User granted permission for notifications.');
                // You can also subscribe the user to push notifications here
                await subscribeToNotifications();
            } else {
                console.log('User denied permission for notifications.');
            }
        }).catch(error => {
            console.error('Error occurred while requesting permission:', error);
        });
    }

    async function handleLogout(){
        try{
            let res = await fetch('https://todo-backend-1-4u6w.onrender.com/api/auth/signOut', {
                method:'GET',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
            })
            res = await res.json()
            if(res.status==='success'){
                console.log('Logged Out')
                setTimeout(()=>{
                    router.push('/login')
                }, 100)
            }
            else{
                console.log('Error while Logging Out, Try again')
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className={styles.main}>

                <div className={styles.child3} onClick={handleLogout}>
                    <button>Logout <i className="fa-solid fa-right-from-bracket" style={{fontSize:'1rem', marginLeft:'0.4rem', color:'black'}}></i></button>
                </div>

                <div className={styles.user}>
                    <i className="fa-solid fa-circle-user" style={{fontSize:'11rem'}}></i>
                </div>

                <div className={styles.details} style={{marginBottom:'6.5rem'}}>
                    <div style={{letterSpacing:'0.05rem', fontSize:'1.4rem', textAlign:'center', margin:'0.3rem'}}>
                        {
                            (user) ? user.username : "XYZ"
                        }
                    </div>
                    <div style={{textAlign:'center', letterSpacing:'0.02rem', margin:'0.3rem'}}>
                        <i className="fa-solid fa-envelope" style={{fontSize:'1rem', marginRight:'0.4rem'}}></i>
                        {
                            (user) ? user.email : "example@gmail.com"
                        }
                    </div>
                </div>

                <div className={styles.child} onClick={subscribeToNotifications}>
                    <button style={{display:'flex', flexDirection:'row', justifyContent:'center', alignContent:'center',justifyItems:'center', textAlign:'center'}}>
                        <i className="fa-solid fa-bell" style={{fontSize:'1.6rem', marginRight:'0.2rem', color:'black', textShadow:'0 0 0.3rem white'}}></i> Notifications
                        {
                            (user && user.subscription) ? <i className="fa-solid fa-toggle-on" style={{fontSize:'1.6rem', marginLeft:'0.4rem', color:'green', textShadow:'0 0 0.3rem green'}}></i> : <i className="fa-solid fa-toggle-off" style={{fontSize:'1.6rem', marginLeft:'0.4rem', color:'red', textShadow:'0 0 0.3rem red'}}></i>
                        }
                    </button>
                </div>

                <div className={styles.child}>
                    <button><Link href='/analytics' style={{textDecoration:'none', color:'white'}}>Smart Analysis</Link></button>
                </div>

                <div className={styles.main2}>
                    <div className={styles.child} onClick={toggleTheme}>
                        <button
                            className={styles.child1}
                        >
                            Theme
                            <span className={styles.c1}>
                            <i className="fa-solid fa-circle-half-stroke" style={{ fontSize: '1rem' }}></i>
                            </span>
                        </button>
                    </div>
                </div>

                <div className={styles.group}>
                <div className={styles.groupChild}>
                    <div className={styles.dev1}>Developer: Srinivas Batthula</div>
                    <div className={styles.dev2}>Contact Developer: <a href="https://srinivas-batthula.github.io/portfolio" target="_blank" style={{cursor:'pointer'}}><i className="fa-solid fa-arrow-up-right-from-square" style={{marginLeft:'0.5rem', fontSize:'1.2rem', marginTop:'0.3rem', color:'lightblue'}}></i></a></div>
                </div>

                <div className={styles.groupChild}>
                    Follow us on Social Media :
                    <br></br>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <a href="https://www.linkedin.com/in/srinivas-batthula/" target="_blank" style={{ textAlign:'center', fontSize: '1.71rem', color: 'skyblue', marginRight: '1rem', borderRadius: '30%' }} className={styles.link1}>
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/srinivas-batthula/" target="_blank" style={{ textAlign:'center', fontSize: '1.71rem', color: 'white', marginRight: '1rem', borderRadius: '30%' }} className={styles.link2}>
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href="https://www.instagram.com/srinivas_abhi8/" target="_blank" style={{ textAlign:'center', fontSize: '1.71rem', color: 'red', marginRight: '1rem', borderRadius: '30%' }} className={styles.link3}>
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>
                </div>

            </div>
        </>
    );
}
