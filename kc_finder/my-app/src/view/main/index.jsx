import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import banner from '../../asset/img/banner.jpg'
import contectImg from '../../asset/img/building.jpg'
import styles from './Main.module.css';
import img from '../../asset/icon/img.svg';
import ImageUploadButton from '../../component/ImageUploadButton';

export default function Main() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

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
      console.log('업로드된 파일:', file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
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
          <button className={styles.findKcBtn}>
            이미지로
            <br />
            동일 기자재 찾기
          </button>
        </div>
      </div>

      <div className={styles.mainBoxContainer}>
        <div className={styles.leftBox}>
          <div className={styles.announceTitle}>
            <h2>공지사항</h2>
            <span> arrow </span>
          </div>
          <div className={styles.announcContent}>
            <ul className={styles.announceItems}>
              <li className={styles.announceItem}>
                <p>
                  <span>KC 고객센터 운영 시간 변경 안내</span>
                  <span>2025-01-30</span>
                </p>
              </li>
              <li className={styles.announceItem}>
                <p>
                  <span>KC 고객센터 운영 시간 변경 안내</span>
                  <span>2025-01-30</span>
                </p>
              </li>
              <li className={styles.announceItem}>
                <p>
                  <span>KC 고객센터 운영 시간 변경 안내</span>
                  <span>2025-01-30</span>
                </p>
              </li>
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
                    <span>아이콘</span>
                    <span>help@securenet.kr</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>아이콘</span>
                    <span>051 - 000 - 0000</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>아이콘</span>
                    <span>국민은행 000000 - 00000 - 00</span>
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
