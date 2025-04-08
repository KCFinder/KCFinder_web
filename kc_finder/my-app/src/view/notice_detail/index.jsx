import React from 'react';
import styles from './NoticeDetail.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { noticeList } from '../../mock/noticeData.js';
import MenuBox from '../../component/menuBox';
import parse from 'html-react-parser';

export default function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const path = '/notice';
  const title = '공지사항';

  const notice = noticeList.find(notice => notice.noticeId === parseInt(id));

  if (!notice) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <MenuBox className={styles.menubox} path={path} />
          <div className={styles.box}>
            <h2>{title}</h2>
            <div className={styles.notFound}>
              <p>존재하지 않는 공지사항입니다.</p>
              <button
                className={styles.backButton}
                onClick={() => navigate('/notice')}
              >
                목록으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path={path} />
        <div className={styles.box}>
          <h2>{title}</h2>
          <div className={styles.noticeDetail}>
            <div className={styles.noticeHeader}>
              <h3 className={styles.noticeTitle}>{notice.noticeTitle}</h3>
              <div className={styles.noticeInfo}>
                <span className={styles.noticeDate}>등록일: {notice.createdAt}</span>
                <span className={styles.noticeViews}>조회수: {notice.viewCount}</span>
              </div>
            </div>
            <div className={styles.noticeContent}>
              {parse(notice.noticeContent)}
            </div>
            <div className={styles.buttonWrapper}>
              <button
                className={styles.backButton}
                onClick={() => navigate('/notice')}
              >
                목록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}