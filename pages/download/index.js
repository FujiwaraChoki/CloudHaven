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

                {
                    content && (
                        <div className={inter.className}>
                            <h1>{name}</h1>
                            <p>Download the file below.</p>
                            <br />
                            <br />
                            <a href={content} download={name} className={styles.downloadButton}>Download</a>
                        </div>
                    )
                }
                {
                    !content && (
                        <div className={inter.className}>
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
