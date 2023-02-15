import { useState } from "react";
import styles from "@/styles/UploadForm.module.css";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function UploadForm() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        console.log("File change");
        setFile(event.target.files[0]);
    };

    const getBase64FileContent = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            return reader.result;
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);

            return null;
        };
    };

    const handleFileUpload = () => {
        const fileInfo = {
            name: file.name,
            content: getBase64FileContent(file),
        }

        if (file) {
            // Send file data to server
            fetch("http://localhost:5000/upload", {
                method: "POST",
                body: JSON.stringify({
                    file_name: fileInfo.name,
                    file_content: fileInfo.content,
                }),
            })

                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
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
                onClick={() => document.querySelector("input[type=file]").click()}
            >
                <p className={inter.className}>
                    Drag and drop your file here, or click to select a file.
                </p>
                <input type="file" onChange={handleFileChange} />
            </div>
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
}

export default UploadForm;
