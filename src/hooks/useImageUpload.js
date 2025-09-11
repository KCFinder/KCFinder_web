import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export const useImageUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDragEnter = e => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = async files => {
    if (files.length === 0) return;

    setLoading(true);
    setUploadedImages([]);
    setUploadedFiles([]);
    setUploadedImageUrls([]);

    const tempImageUrls = [];
    const tempFiles = [];
    const tempFirebaseUrls = [];

    for (const file of files) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('jpg 또는 png 파일만 업로드 가능합니다.');
        setLoading(false);
        return;
      }

      tempImageUrls.push(URL.createObjectURL(file));
      tempFiles.push(file);

      try {
        const storageRef = ref(
          storage,
          `images/${file.name}_${new Date().getTime()}`,
        );
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        tempFirebaseUrls.push(downloadUrl);
      } catch (error) {
        console.error('Firebase 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
        setLoading(false);
        return;
      }
    }

    setUploadedImages(tempImageUrls);
    setUploadedFiles(tempFiles);
    setUploadedImageUrls(tempFirebaseUrls);
    setLoading(false);
  };

  const handleFileInput = e => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const resetUpload = () => {
    setUploadedImages([]);
    setUploadedFiles([]);
    setUploadedImageUrls([]);
    setLoading(false);
  };

  return {
    isDragging,
    uploadedImages,
    uploadedImageUrls,
    uploadedFiles,
    loading,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    resetUpload,
  };
};
