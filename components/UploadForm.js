import { useState } from "react";
import { Inter } from "@next/font/google";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import styles from "@/styles/UploadForm.module.css";

const inter = Inter({ subsets: ["latin"] });

function UploadForm() {
    const [file, setFile] = useState(null);
    const [link, setLink] = useState("");
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleFileChange = (event) => {
        console.log("File change");
        setFile(event.target.files[0]);
    };

    function getFileContent(file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                resolve(reader.result.split(',')[1]);
            };
        });
    }

    const urlifyFileName = (fileName) => {
        return fileName.replace(/ /g, "_");
    };

    const handleFileUpload = () => {
        if (file) {
            // Send file data to server
            getFileContent(file).then((fileContent) => {
                fetch("http://10.0.0.198:9522/upload", {
                    method: "POST",
                    body: JSON.stringify({
                        file_name: urlifyFileName(file.name),
                        file_content: fileContent,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setLink(data.link);
                        onOpenModal();
                    });
            });
        }
    };

    const handleDragOver = (event) => {
        console.log("Drag over");
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event) => {
        console.log("Drop");
        event.preventDefault();
        event.stopPropagation();
        setFile(event.dataTransfer.files[0]);
    };

    return (
        <div className={styles.uploadForm}>
            <div
                className={styles.uploadArea}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() =>
                    document.querySelector("input[type=file]").click()
                }
            >
                <p className={inter.className}>
                    Drag and drop your file here, or click to select a file.
                </p>
                <input type="file" onChange={handleFileChange} />
            </div>
            <button onClick={handleFileUpload}>Upload</button>
            {link && (
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className={inter.className}>Successfully uploaded File</h2>
                <p className={inter.className}>
                    <br />
                    Your file has been successfully uploaded, here is the link:<br />
                    <a href={link} className={styles.linkToDownload}>{link}</a>
                </p>
            </Modal>
            )}
        </div>
    );
}

export default UploadForm;
