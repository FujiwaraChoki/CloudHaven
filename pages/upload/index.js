import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { Inter } from '@next/font/google'
import UploadForm from '@/components/UploadForm'

const inter = Inter({ subsets: ['latin'] })

export default function UploadPage() {
    return (
        <>
            <Head>
                <title>CloudHaven</title>
                <meta name="description" content="CloudHaven: The best file sharing service." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link
                        href="/"
                        className={styles.card}
                    >
                        <h2 className={inter.className}>
                            Home <span>-&gt;</span>
                        </h2>
                        <p className={inter.className}>
                            Go to the home&nbsp;page.
                        </p>
                    </Link>

                    <Link
                        href="search"
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
                        href="about"
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
                <UploadForm />
            </main>
        </>
    )
}
