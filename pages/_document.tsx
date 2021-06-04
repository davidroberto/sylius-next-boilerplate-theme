import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    
                    <meta name="title" content="Next.js / Typescript boilerplate theme for Sylius new API"/>
                    <meta name="description" content="Next.js / Typescript boilerplate theme for Sylius new API" />

                </Head>
                <body style={{position: "relative"}}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;