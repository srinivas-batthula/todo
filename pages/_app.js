import 'bootstrap/dist/css/bootstrap.min.css'
import {ThemeProvider} from '../components/customHooks/ThemeContext'
import {DataProvider} from '../components/customHooks/DataContext'

import '../styles/globals.css'
import '../styles/Login.css'
import Layout from '../components/Layout'


function MyApp({ Component, pageProps }) {
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