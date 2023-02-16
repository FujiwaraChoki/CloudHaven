import styles from '@/styles/Modal.module.css';
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error("Failed to copy link: ", err);
    }
};

const Modal = ({ link }) => {
    return (
        <div className={styles.modal} id={"modal"}>
            <div className={styles.modalContent}>
                <h2 className={inter.className}>Successfully uploaded!</h2>
                <p className={inter.className}>Your file has been successfully uploaded, and this your permanent link: {link}</p>
                <div className={styles.modalActions}>
                    <button className={styles.closeButton} onClick={() => {
                        document.querySelector('#modal').style.display = 'none';
                    }}>Close</button>
                    <button className={styles.copyLinkButton} onClick={() => copyToClipboard(link)}>Copy</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;