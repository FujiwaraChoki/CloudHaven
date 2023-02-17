import clientPromise from "@/mongo";
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function ({ content, name }) {
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

                {
                    content && (
                        <div className={styles.center}>
                            <h1>Download</h1>
                            <p>Download the file below.</p>
                            <a href={content} download={name}>Download</a>
                        </div>
                    )
                }
                {
                    !content && (
                        <div className={styles.center}>
                            <h1>404</h1>
                            <p>File not found.</p>
                        </div>
                    )
                }
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    // Get the file name from the query
    const { file_name } = context.query;

    // Connect to the database
    const client = await clientPromise;

    // Get the file from the database
    const collection = client.db("CloudHaven").collection("files");

    // Find the file in the database
    const file = await collection.findOne({ name: file_name });

    // If the file was not found, return a 404 error
    if (!file) {
        return {
            props: {
                content: null,
            }
        };
    }

    // Otherwise, return the file content and type
    return {
        props: {
            content: file.content,
            name: file.name
        },
    };
}
