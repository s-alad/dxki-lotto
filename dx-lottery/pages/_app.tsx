import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout'
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";
import { Toaster } from 'react-hot-toast';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain="mumbai">
      <Layout>
        <Component {...pageProps} />
        <Toaster position={"bottom-right"}/>
      </Layout>
    </ThirdwebProvider>
  )
}
