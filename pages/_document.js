import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* Custom fonts, meta tags, or external scripts go here */}
                    <meta name='title' content='Todo_App' />
                    <meta name='author' content='Srinivas Batthula' />
                    <meta name="description" content="Srinivas Batthula Todo Fullstack" />
                    {/*  Icon...  */}
                    <link rel="icon" href="/icon.jpg" type="image/x-icon" />

                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />

                    <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* Register the service worker */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('https://srinivas-batthula.github.io/todo/service-worker.js')
                    .then(function(registration) {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch(function(error) {
                        console.log('ServiceWorker registration failed');
                    });
                });
                }
            `,
                        }}
                    />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
