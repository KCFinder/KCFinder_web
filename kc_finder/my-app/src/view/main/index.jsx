import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import axios from 'axios';
import banner from '../../asset/img/banner.jpg'
import contectImg from '../../asset/img/building.jpg'
import styles from './Main.module.css';
import img from '../../asset/icon/img.svg';
import phoneIcon from '../../asset/icon/phone-icon.svg';
import emailIcon from '../../asset/icon/email_icon.svg';
import arrow from '../../asset/icon/arrow.svg';
import { noticeList } from '../../mock/noticeData.ts';
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from '../../apiConfig';

export default function Main() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // Firebase URL 배열
  const [uploadedFiles, setUploadedFiles] = useState([]); // 파일 객체 배열
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth(); // 로그인된 사용자 정보 가져오기

  const latestNotice = [...noticeList]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (!isAuthenticated) {
      alert('로그인 후 이용 가능한 서비스입니다.');
      navigate('/auth/login');
      return;
    }

    const file = e.dataTransfer.files[0];
    handleFiles(file);
  };

  // 여러 파일을 처리하는 함수
  const handleFiles = async (files) => {
    if (!isAuthenticated) {
      alert('로그인 후 이용 가능한 서비스입니다.');
      navigate('/auth/login');
      return;
    }

    if (files.length === 0) return;

    setLoading(true);
    setUploadedImages([]);
    setUploadedFiles([]);
    setUploadedImageUrls([]);
    setIsImageUploaded(false);

    const tempImageUrls = [];
    const tempFiles = [];
    const tempFirebaseUrls = [];

    for (const file of files) {
      // if (file.size > 500 * 1024) {
      //   alert('파일 크기는 500KB 이하여야 합니다.');
      //   setLoading(false);
      //   return;
      // }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('jpg 또는 png 파일만 업로드 가능합니다.');
        setLoading(false);
        return;
      }

      tempImageUrls.push(URL.createObjectURL(file));
      tempFiles.push(file);

      try {
        console.log(file.name);
        const storageRef = ref(storage, `images/${file.name}_${new Date().getTime()}`);
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        tempFirebaseUrls.push(downloadUrl);
        console.log('Firebase 이미지 URL:', downloadUrl);
      } catch (error) {
        console.error('Firebase 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
        resetUploadedImages();
        setLoading(false);
        return;
      }
    }

    setUploadedImages(tempImageUrls);
    setUploadedFiles(tempFiles);
    setUploadedImageUrls(tempFirebaseUrls);
    setIsImageUploaded(true);
    setLoading(false);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFindKcBtn = async () => {
    if (uploadedImageUrls.length === 0 || !user) {
      alert('이미지를 먼저 업로드하고 로그인해주세요.');
      return;
    }

    // 첫 번째 파일 정보만 가져옵니다.
    const firstFile = uploadedFiles[0];

    // 백엔드로 보낼 단일 객체 데이터 (product)
    const uploadProductData = {
      userCode: user.data,
      productName: firstFile.name,
    };

    try {
      // 1. product 정보를 먼저 업로드하여 productCode를 받아옵니다.
      const productResponse = await axios.post(`${API_BASE_URL}/api/product/upload`, uploadProductData);
      console.log('product 업로드 응답:', productResponse.data);

      // 백엔드에서 반환된 productCode를 추출합니다.
      const productCode = productResponse.data;

      // 2. 모든 이미지 파일 정보를 하나의 배열로 묶습니다.
      const uploadFileData = uploadedImageUrls.map((imageUrl) => {
        return {
          productCode: productCode.data,
          imageUrl: imageUrl,
        };
      });

      // 3. 배열 형태의 데이터를 단 한 번의 요청으로 백엔드에 보냅니다.
      const fileResponse = await axios.post(`${API_BASE_URL}/api/product/file/upload`, uploadFileData);

      console.log('모든 이미지 URL이 서버로 전송되었습니다.');
      alert('모든 파일 업로드가 완료되었습니다.');

      // 성공 시 페이지 이동
      navigate('/my/finder');

    } catch (error) {
      console.error('백엔드 요청 실패:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  };

  const resetUploadedImages = () => {
    setUploadedImages([]);
    setUploadedFiles([]);
    setUploadedImageUrls([]);
    setIsImageUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadBoxClick = () => {
    if (!isAuthenticated) {
      alert('로그인 후 이용 가능한 서비스입니다.');
      navigate('/auth/login');
      return;
    }
    fileInputRef.current?.click();
  };

  return (
      <>
        <div className={styles.mainWrapper}>
          <div className={styles.banner}>
          <span>이미지만으로 손쉽게 인증된 제품을 찾아보고
            <br />
            동일 기자재 신고를 통해 시험비를 절감 해보세요.</span>
            <img className={styles.bannerImg} src={banner} alt="화면 배너" onClick={() => navigate('/')} />
          </div>

          <div className={styles.findKcContainer}>
            {!isImageUploaded ? (
                <div
                    className={`${styles.findKcBox} ${isDragging ? styles.dragging : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleUploadBoxClick}
                >
                  <div><img src={img} alt="이미지 업로드 식별 아이콘" /></div>
                  <span>여러 개의 500KB이하의 jpg, png 파일만 등록 할 수 있습니다.</span>
                  <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInput}
                      accept=".jpg,.jpeg,.png"
                      multiple // 여러 파일 선택 가능
                      style={{ display: 'none' }}
                  />
                  <div className={styles.uploadBtn}>{loading ? '업로드 중...' : '이미지 업로드'}</div>
                </div>
            ) : (
                <div className={styles.imagePreviewContainer}>
                  {uploadedImages.map((image, index) => (
                      <img
                          key={index}
                          src={image}
                          alt={`업로드된 이미지 ${index}`}
                          className={styles.uploadedImagePreview}
                      />
                  ))}
                  <button
                      className={styles.resetImageBtn}
                      onClick={resetUploadedImages}
                  >
                    다시 업로드 하기
                  </button>
                </div>
            )}
            <button
                className={`${styles.findKcBtn} ${isImageUploaded && !loading ? styles.findKcBtnActive : ''}`}
                onClick={handleFindKcBtn}
                disabled={!isImageUploaded || loading}
            >
              이미지로
              <br />
              동일 기자재 찾기
            </button>
          </div>
          <div style={{fontWeight: "600", fontSize: "25px"}}>
            <br/>
            위 서비스는리뉴얼 중으로 카카오톡: KCfinder 또는 연락처, 이메일로 연락부탁드립니다.
          </div>
        </div>

        <div className={styles.mainBoxContainer}>
          <div className={styles.leftBox}>
            <div className={styles.announceTitle}>
              <h2>공지사항</h2>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/notice')}> <img src={arrow} width={20} alt="고객센터 바로가기" /> </span>
            </div>
            <div className={styles.announcContent}>
              <ul className={styles.announceItems}>
                {latestNotice.map((notice) => (
                    <li
                        key={notice.noticeId}
                        className={styles.announceItem}
                        onClick={() => navigate(`/notice/${notice.noticeId}`)}
                        style={{ cursor: 'pointer' }}
                    >
                      <p>
                        <span>{notice.noticeTitle}</span>
                        <span>{notice.createdAt}</span>
                      </p>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.rightBox}>
            <div className={styles.contectTitle}>
              <h2>문의하기</h2>
            </div>

            <div className={styles.rightBoxContent}>
              <div className={styles.leftImg}>
                <img src={contectImg} alt="문의하기 이미지" />
              </div>
              <div className={styles.rightInfo}>
                <ul>
                  <li>
                    <div>
                      <img width={23} src={emailIcon} alt="문의 이메일" />
                      <span>yeonho4698@gmail.com</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <img width={20} src={phoneIcon} alt="문의 번호 1" />
                      <span>070-7762-4698</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <img width={20} src={phoneIcon} alt="문의 번호 2" />
                      <span>010-3300-4698</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}