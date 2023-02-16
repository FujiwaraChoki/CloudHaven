import styles from '@/styles/File.module.css'
import Link from 'next/link';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

const FileCard = ({ file }) => {
    return (
        <div className={inter.className}>
            <Link className={styles.card} href={file.link}>
                <h3 className={styles.cardTitle}>{file.name}</h3>
                <p><b>Size:&nbsp;</b>{file.size}</p>
                <p><b>Type:&nbsp;</b>{file.type}</p>
                <p><b>Date:&nbsp;</b>{file.creation_date}</p>
            </Link>
        </div>
    )
};

export default FileCard;