import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>CloudHaven</title>
        <meta name="description" content="CloudHaven: The best file sharing service." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            <code className={styles.code}>The best, and most easy-to-use file sharing service!</code>
          </p>
          <div>
            <a
              href="https://github.com/FujiwaraChoki/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By FujiwaraChoki
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            src="/favicon.png"
            alt="Logo"
            className={styles.logo}
            width={200}
            height={200}
          />
        </div>

        <div className={styles.grid}>
          <Link
            href="upload/"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Upload <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Upload a&nbsp;file!
            </p>
          </Link>

          <Link
            href="search/"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Search <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Search for publicly available&nbsp;files.
            </p>
          </Link>

          <Link
            href="upload"
            className={styles.card}
          >
            <h2 className={inter.className}>
              About <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find out more about this project and its&nbsp;creator.
            </p>
          </Link>
        </div>
      </main>
    </>
  )
}