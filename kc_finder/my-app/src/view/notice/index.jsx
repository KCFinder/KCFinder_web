import React, { useMemo, useState } from 'react';
import styles from './Notice.module.css';
import MenuBox from '../../component/menuBox';
import Pagination from '../../component/pagenation';
import { noticeList } from '../../mock/noticeData.js';
import { useNavigate } from 'react-router';

export default function Notice() {
  const path = '/notice';
  const title = '공지사항';
  const [currentPage, setCurrentPage] = useState(1);

  const sortedNoticeList = useMemo(() => {
    return [...noticeList].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [noticeList]);

  const totalPages = Math.ceil(noticeList.length / 10);
  const maxVisiblePages = 5;
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNoticeClick = (noticeId) => {
    navigate(`/notice/${noticeId}`);
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
                {sortedNoticeList.map((notice) => (
                  <tr
                    key={notice.noticeId}
                    onClick={() => handleNoticeClick(notice.noticeId)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{notice.noticeId}</td>
                    <td className={styles.noticeTitle}>{notice.noticeTitle}</td>
                    <td>{notice.createdAt}</td>
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