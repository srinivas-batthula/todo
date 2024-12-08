import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from '../components/customHooks/ThemeContext'
import { DataProvider } from '../components/customHooks/DataContext'

import '../styles/globals.css'
import '../styles/Login.css'
import Layout from '../components/Layout'


function MyApp({ Component, pageProps }) {

    // useEffect(() => {
    //     if ('serviceWorker' in navigator) {
    //         // Register the service worker
    //         navigator.serviceWorker
    //             .register('/service-worker.js')
    //             .then((registration) => {
    //                 console.log('Service Worker registered with scope:', registration.scope);
    //             })
    //             .catch((error) => {
    //                 console.error('Service Worker registration failed:', error);
    //             });
    //     }
    // }, []);

    return (
        <ThemeProvider>
            <DataProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </DataProvider>
        </ThemeProvider>
    )
}


export default MyApp;