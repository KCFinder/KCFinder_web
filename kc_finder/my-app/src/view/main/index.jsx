import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import banner from '../../asset/img/banner.jpg'
import contectImg from '../../asset/img/building.jpg'
import styles from './Main.module.css';
import img from '../../asset/icon/img.svg';
import phoneIcon from '../../asset/icon/phone-icon.svg';
import emailIcon from '../../asset/icon/email_icon.svg';
import arrow from '../../asset/icon/arrow.svg';
import { noticeList } from '../../mock/noticeData.js';

export default function Main() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

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
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file) {
      if (file.size > 500 * 1024) {
        alert('파일 크기는 500KB 이하여야 합니다.');
        return;
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('jpg 또는 png 파일만 업로드 가능합니다.');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setIsImageUploaded(true);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFindKcBtn = () => {
    if (isImageUploaded) {
      navigate('/services/finder')
    } else {
      alert('이미지를 먼저 업로드해 주세요.');
    }
  };

  const resetUploadedImage = () => {
    setUploadedImage(null);
    setIsImageUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
              onClick={() => fileInputRef.current?.click()}
            >
              <div><img src={img} alt="이미지 업로드 식별 아이콘" /></div>
              <span>500KB이하의 jpg, png 파일만 등록 할 수 있습니다.</span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                accept=".jpg,.jpeg,.png"
                style={{ display: 'none' }}
              />
              <div className={styles.uploadBtn}>이미지 업로드</div>
            </div>
          ) : (
            <div className={styles.imagePreviewContainer}>
              <img
                src={uploadedImage}
                alt="업로드된 이미지"
                className={styles.uploadedImagePreview}
              />
              <button
                className={styles.resetImageBtn}
                onClick={resetUploadedImage}
              >
                다시 업로드 하기
              </button>
            </div>
          )}
          <button
            className={`${styles.findKcBtn} ${isImageUploaded ? styles.findKcBtnActive : ''}`}
            onClick={handleFindKcBtn}
          >
            이미지로
            <br />
            동일 기자재 찾기
          </button>
        </div>
        <div style={{fontWeight: "600", fontSize: "25px"}}>
        <br />
        위 서비스는리뉴얼 중으로 카카오톡: KC-Finder 또는 연락처, 이메일로 연락부탁드립니다.
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