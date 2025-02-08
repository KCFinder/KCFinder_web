import React, { useState } from 'react';
import styles from './Notice.module.css';
import MenuBox from '../../component/menuBox';
import Pagination from '../../component/pagenation';
import noticeData from '../../constants/noticeData';

export default function Notice() {
  const path = '/notice';
  const title = '공지사항';
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const maxVisiblePages = 5;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path={path} />
        <div className={styles.box}>
          <h2>{title}</h2>
          <div className={styles.noticeList}>
            <table className={styles.noticeTable}>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {noticeData.map((notice) => (
                  <tr key={notice.id}>
                    <td>{notice.id}</td>
                    <td className={styles.noticeTitle}>{notice.title}</td>
                    <td>{notice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.paginationWrapper}>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                maxVisiblePages={maxVisiblePages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}