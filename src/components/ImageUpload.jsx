import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Firebase storage reference

const ImageUpload = ({ onImageUpload }) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    // Handle file change
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // Upload file to Firebase Storage
    const handleUpload = () => {
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.error('Upload failed:', error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    onImageUpload(downloadURL); // Pass download URL to parent component
                }
            );
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>Upload Progress: {progress}%</p>
        </div>
    );
};

export default ImageUpload;
