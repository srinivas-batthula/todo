import React from 'react'
import Link from 'next/link'

import styles from './../styles/Navbar.module.css'


export default function Nav(){
    return(
        <>
            <div className={styles.main}>
                <div className={styles.child}>
                    <Link href='/'>
                        <i className="fa-solid fa-house" style={{fontSize:'1.85rem'}}></i>
                    </Link>
                </div>
                <div className={styles.child}>
                    <Link href='/analytics'>
                        <i className="fa-solid fa-chart-line" style={{fontSize:'2rem'}}></i>
                    </Link>
                </div>
                <div className={styles.child}>
                    <Link href='/profile'>
                        <i className="fa-solid fa-user" style={{fontSize:'2rem'}}></i>
                    </Link>
                </div>
            </div>
        </>
    )
}