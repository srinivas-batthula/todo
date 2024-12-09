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
                ) : (load===true) ? (<div >
                    <span className={styles.loader}></span>
                </div>) : ( <div>
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
