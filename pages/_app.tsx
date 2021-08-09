import { AppProps } from "next/app"
import Head from "next/head"
import "styles/global.css"

function RootApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>next</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default RootApp
