import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import common from '../styles/Common.module.css'
import styles from '../styles/Index.module.css'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={common.container}>
      <Head>
        <title>CloudHaven</title>
        <meta name="description" content="CloudHaven" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <Navbar />
      <main className={inter.className}>
        <h1 className={common.title}>CloudHaven</h1>
        <p className={common.description}>
        CloudHaven is a user-friendly platform that allows individuals to securely upload and share their files with others. With its intuitive interface and advanced security features, users can easily upload any type of file and share it with anyone, anywhere. Whether you're sharing important work documents, family photos, or just need a convenient place to store your files, CloudHaven has you covered. So why wait? Sign up for CloudHaven today and experience the ultimate in file sharing and storage.
        </p>
        <button className={common.button}>Sign Up</button>
      </main>
    </div>
  )
}
