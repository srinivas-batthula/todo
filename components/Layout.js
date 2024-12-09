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
        setTimeout(()=>{
            <div style={{width:'100%', height:'100vh', display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', backgroundColor: 'rgb(0, 153, 255)', color: 'white'}}>
                <div style={{fontSize:'1.8rem', marginBottom: '0.5rem'}}>WELCOME TO YOUR</div>
                <div style={{fontSize:'2rem'}}><strong>Task Manager</strong></div>
            </div>
        }, 400)
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
