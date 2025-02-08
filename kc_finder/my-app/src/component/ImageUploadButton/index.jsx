import React, { useState } from 'react';
import styles from './ImageUploadButton.module.css';

const ImageUploadButton = () => {
 const [selectedImage, setSelectedImage] = useState(null);

 const handleImageChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     setSelectedImage(URL.createObjectURL(file));
   }
 };

 return (
   <div className={styles.container}>
     <label className={styles.uploadButton}>
       이미지 업로드
       <input
         type="file"
         accept="image/*"
         onChange={handleImageChange}
         className={styles.input}
       />
     </label>
     {selectedImage && (
       <img 
         src={selectedImage} 
         alt="Uploaded preview" 
         className={styles.preview}
       />
     )}
   </div>
 );
};

export default ImageUploadButton;