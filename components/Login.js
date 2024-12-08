import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import { DataContext } from './customHooks/DataContext'

import styles from '../styles/Login.module.css'


export default function Login() {
    const { FetchData } = useContext(DataContext)

    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const [error, setError] = useState({ email: '', password: '', username: '' });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false); // state to toggle between Login and Register

    const router = useRouter();

    // Email and password validation function
    function validate() {
        let tempError = { ...error };

        // Validate Email
        if (!formData.email) {
            tempError.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempError.email = 'Email is invalid';
        } else {
            tempError.email = '';
        }

        // Validate Password
        if (!formData.password) {
            tempError.password = 'Password is required';
        } else if (formData.password.length < 6) {
            tempError.password = 'Password is too short (<6)';
        } else {
            tempError.password = '';
        }

        // Validate Full Name (if in Register mode)
        if (isRegistering && !formData.username) {
            tempError.username = 'Full Name is required';
        } else {
            tempError.username = '';
        }

        setError(tempError);

        return !Object.values(tempError).some(val => val !== '');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true);
            setErr(null);

            // console.log(formData)

            try {
                const endpoint = isRegistering ? 'https://todo-backend-1-4u6w.onrender.com/api/auth/signUp' : 'https://todo-backend-1-4u6w.onrender.com/api/auth/signIn'; // Choose API based on mode
                const response = await fetch(endpoint, {
                    method: 'POST',
                    credentials: 'include',       //To include all cookies (jwt-tokens)......
                    body: JSON.stringify(formData),
                    headers:{
                        'Content-Type':'application/json'
                    },
                    // mode:'cors',
                });

                const result = await response.json();

                if (response.ok) {
                    // Redirect to the dashboard or homepage
                    // console.log(result)
                    setSuccessMessage('Redirecting to HomePage...')
                    setTimeout(async()=>{
                        await FetchData()
                        router.push('/') }, 1000)
                } else {
                    setErr(result.details || 'Request failed');
                }
            } catch (error) {
                setErr('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleOAuth = async (e) => {
        e.preventDefault();

        try {
            // Send the user to your backend to start the Google OAuth flow
            window.location.href = "https://todo-backend-1-4u6w.onrender.com/api/auth/google1"; // Redirect to backend route
        }
        catch (error) {
            setErr('Error: ' + error.message)
            console.log(error)
        }
    }


    return (
        <div className={styles.main}>
        <div className="container">
            <h2 className="text-center mb-24 fs-1" style={{marginTop:'4rem'}}>{isRegistering ? 'Register' : 'Login'}</h2>
            <form className="mx-auto">
                {err && <div className="alert alert-danger">{err}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                {isRegistering && (
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="username"
                            id='username'
                            value={formData.username}
                            onChange={handleChange}
                            className={`form-control ${error.username ? 'is-invalid' : ''}`}
                            autoFocus
                        />
                        {error.username && <div className="invalid-feedback">{error.username}</div>}
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-control ${error.email ? 'is-invalid' : ''}`}
                        autoFocus
                    />
                    {error.email && <div className="invalid-feedback">{error.email}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-control ${error.password ? 'is-invalid' : ''}`}
                    />
                    {error.password && <div className="invalid-feedback">{error.password}</div>}
                </div>

                <button type="button" onClick={handleSubmit} className="btn btn-primary px-4 py-2 fs-6 fw-bold" style={{ height:'2rem' ,display:'flex', justifyContent:'center', justifyItems:'center', alignContent:'center', alignItems:'center', margin:'auto'}} disabled={loading}>
                    {loading ? (isRegistering ? 'Registering...' : 'Logging in...') : (isRegistering ? 'Register' : 'Login')}
                </button>

                {/* Switch between Login and Register */}
                <button
                    type="button"
                    className="btn btn-link w-100 mt-3"
                    style={{color:'rgb(43, 151, 218)'}}
                    onClick={() => setIsRegistering(!isRegistering)}
                >
                    {isRegistering ? 'Already have an account? SignIn' : 'Don\'t have an account? SignUp'}
                </button>

                {/* SignIn with Google */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop: '0.8rem', marginBottom:'2rem' }}>
                    <span style={{ textAlign: 'center', marginTop: '0.8rem' }}>or</span>
                    <span style={{ textAlign: 'center', marginTop: '0.5rem' }}>Continue with Google</span>
                    <button type='button' className='google' onClick={handleOAuth} style={{ cursor: 'pointer', margin:'auto', width:'2.2rem', marginTop: '0.8rem' }}>
                        <svg viewBox="0 0 128 128">
                            <path fill="#fff" d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"></path><path fill="#e33629" d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"></path><path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"></path><path fill="#587dbd" d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"></path><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
}

{/* <i className="fa-brands fa-google" style={{color:''}}></i> */ }