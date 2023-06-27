import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout'
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain="mumbai">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThirdwebProvider>
  )
}
