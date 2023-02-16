import { useState } from "react";
import styles from "@/styles/UploadForm.module.css";
import { Inter } from "@next/font/google";
import Modal from '@/components/Modal'

const inter = Inter({ subsets: ["latin"] });

function UploadForm() {
    const [file, setFile] = useState(null);
    const [link, setLink] = useState("");

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

    const handleFileUpload = () => {
        if (file) {
            // Send file data to server
            getFileContent(file).then((fileContent) => {
                fetch("http://localhost:5000/upload", {
                    method: "POST",
                    body: JSON.stringify({
                        file_name: file.name,
                        file_content: fileContent,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setLink(data.link);
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
            {link && <Modal link={link} />}
        </div>
    );
}

export default UploadForm;
