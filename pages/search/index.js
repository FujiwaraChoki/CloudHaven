import Head from 'next/head'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import File from '@/components/File'

const inter = Inter({ subsets: ['latin'] })

const SearchPage = ({ files }) => {
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
                        href="upload"
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

                    <div>
                        <h2 className={inter.className}>
                            Search
                        </h2>
                        <p className={inter.className}>
                            Search for a&nbsp;file.
                        </p>

                        <form>
                            <input style={{
                                marginLeft: '0',
                            }}
                                type="text" id="search_value" placeholder="Search..." />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div className={styles.files}>
                    {files ? (
                        files.map((file) => (
                            <File file={file} link={file.link} key={file.name} />
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const files = await fetch('http://localhost:3000/api/search', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json())
        .then((data) => data.files)
        .catch((err) => console.log(err));

    return {
        props: {
            files,
        },
    };
}


export default SearchPage;