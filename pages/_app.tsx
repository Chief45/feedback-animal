import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimatedBackground from '../components/AnimatedBackground'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Animal Feedback</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col text-slate-100 font-sans selection:bg-indigo-500/30">
        <AnimatedBackground />
        <Header />
        <main className="flex-1 container py-8 z-10 relative">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
