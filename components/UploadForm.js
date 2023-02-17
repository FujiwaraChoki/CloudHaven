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

    const urlifyFileName = (file_name) => {
        return file_name.replace(/ /g, "_");
    };

    const handleFileUpload = () => {
        if (file) {
            console.table(file);
            // Send file data to server
            getFileContent(file).then((content) => {
                fetch("http://localhost:3000/api/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: urlifyFileName(file.name),
                        content: content,
                        creation_date: file.lastModifiedDate,
                        size: file.size,
                        type: file.type,
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
                    document.querySelector("input[type='file']").click()
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
                        Your file has been successfully uploaded, you can access it with the following link:<br />
                        <a href={link} className={styles.linkToDownload}>{link}</a>
                    </p>
                </Modal>
            )}
        </div>
    );
}

export default UploadForm;
