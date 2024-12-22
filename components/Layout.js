import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './../styles/Layout.module.css';
import Nav from './Navbar';
import Login from './Login';

import { ThemeContext } from './customHooks/ThemeContext'
import { DataContext } from './customHooks/DataContext'


const Layout = ({ children }) => {
    const [path, setPath] = useState('')
    const [load, setLoad] = useState(false)
    const {theme} = useContext(ThemeContext)
    const { FetchData } = useContext(DataContext)

    useEffect(async() => {
        if(!navigator.cookieEnabled){
            alert("Please Enable COOKIES in your browser to access all features of this website. (Settings > Privacy&Security > Third-Party cookies, then choose 'Allow third-party cookies')")
        }

        fetch('https://todo-backend-1-4u6w.onrender.com/', {
            method: 'GET',
            credentials: 'include',           //To include all cookies (jwt-tokens)......
            headers:{
                'Content-Type':'application/json'
            },
        })

        setLoad(true)
        await FetchData()
        setLoad(false)
    }, [])     //Fetch Tasks on Refresh

    const router = useRouter()
    // Get the current page path (this will update whenever the route changes)
    const currentPage = router.pathname

    useEffect(() => {
        setPath(currentPage)
    }, [currentPage]);  // Re-run when the page changes


    return (
        <div className={styles.real}>
            {
                (path === '/login') ? (
                    <div >
                        <Login />
                    </div>
                ) : (load===true) ? (
                    <div style={{overflow:'hidden'}}>
                        <div style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center', justifyItems:'center'}}>
                            <span className={styles.loader}></span>
                            <div style={{color:'#f45555', textAlign:'center', fontSize:'1.3rem', fontWeight:'600', marginTop:'0.6rem'}}>Fetching Data...</div>
                        </div>
                    </div>  ) : ( <div>
                        <main style={{
                            backgroundColor: theme,
                            color: theme === 'white' ? 'rgb(39, 39, 39)' : 'white',
                        }}
                        >{children}</main>

                        <Nav />
                    </div>
                    )
            }
        </div>
    );
};

export default Layout;
