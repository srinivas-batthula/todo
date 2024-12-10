import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* <link rel="manifest" href="/manifest.json" /> */}
                    <link rel='manifest' href='https://srinivas-batthula.github.io/todo/manifest.json' />
                    {/* Custom fonts, meta tags, or external scripts go here */}
                    <meta name="theme-color" content="linear-gradient(45deg, #5d16a9, #4085fc)" />
                    <meta name='title' content='Task Manager' />
                    <meta name='author' content='Srinivas Batthula' />
                    <meta name="description" content="Srinivas Batthula Todo Fullstack" />
                    {/*  Icon...  */}
                    <link rel="icon" href="https://srinivas-batthula.github.io/todo/icon.jpg" type="image/x-icon" />

                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />

                    <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                    
                </body>
            </Html>
        );
    }
}

export default MyDocument;
