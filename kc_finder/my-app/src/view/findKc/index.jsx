import React, { useState } from 'react';
import styles from './FindKc.module.css';
import MenuBox from '../../component/menuBox';
import Pagination from '../../component/pagenation';
import img01 from '../../asset/example/example01.jpg';
import img02 from '../../asset/example/example02.jpg';

export default function FindKc() {
  const path = '/services';
  const title = '동일기자재 찾기';
  const validationCode = 'CB015R1633-3001';
  const link = 'https://safetykorea.kr/search/searchPop?certNum=CB015R1633-3001';
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const maxVisiblePages = 5;
  
  const [isServiceAvailable, setIsServiceAvailable] = useState(true);

  const uploadHistory = [
    {
      id: 5,
      uploadDate: '2024.02.15',
      image: img01,
      certNumber: 'CB015R1633-3005',
      result: '매칭 성공'
    },
    {
      id: 4,
      uploadDate: '2024.02.14',
      image: img02,
      certNumber: 'CB015R1633-3004',
      result: '매칭 성공'
    },
    {
      id: 3,
      uploadDate: '2024.02.14',
      image: img01,
      certNumber: 'CB015R1633-3003',
      result: '매칭 실패'
    },
    {
      id: 2,
      uploadDate: '2024.02.13',
      image: img02,
      certNumber: 'CB015R1633-3002',
      result: '매칭 성공'
    },
    {
      id: 1,
      uploadDate: '2024.02.13',
      image: img01,
      certNumber: 'CB015R1633-3001',
      result: '매칭 실패'
    }
  ].sort((a, b) => b.id - a.id);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLinkClick = () => {
    window.open(link, '_blank');
  };

  if (!isServiceAvailable) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <MenuBox className={styles.menubox} path={path} />
          <div className={styles.box}>
            <h2>{title}</h2>
            <div className={styles.serviceUnavailable}>
              <div className={styles.unavailableMessage}>
                <h3>리뉴얼 중인 서비스입니다</h3>
                <p>더 나은 서비스를 위해 준비 중입니다. 불편을 드려 죄송합니다.</p>
                <p>빠른 시일 내에 새로운 모습으로 찾아뵙겠습니다.</p>
              </div>
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
          <div className={styles.resultTitle}>
            <h3>결과</h3>
            <div className={styles.paginationWrapper}>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                maxVisiblePages={maxVisiblePages}
              />
            </div>
            <button className={styles.findAnotherKcBtn}>다른 이미지도 검색하기</button>
          </div>

          <div className={styles.result}>
            <ul>
              <li>
                <p><strong>내 제품</strong></p>
                <div className={styles.myImg}>
                  <img src={img01} alt="비교할 내 이미지" />
                </div>
              </li>
              <li>
                <p><strong>제품<br />이미지</strong></p>
                <div className={styles.myImg}>
                  <img src={img02} alt="유사 제품 이미지" />
                </div>
              </li>
              <li>
                <p><strong>인증번호</strong></p>
                <div>
                  <span>{validationCode}</span>
                </div>
              </li>
              <li>
                <p><strong>링크</strong></p>
                <div className={styles.linkBox}>
                  <span>{link}</span>
                </div>
                <div>
                  <button onClick={handleLinkClick} className={styles.goToLinkBtn}>
                    링크 바로가기
                  </button>

                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.box}>
          <h2>제품 업로드 이력 목록</h2>
          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>순번</th>
                <th>업로드 이미지</th>
                <th>인증번호</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className={styles.uploadedImg}>
                    <img src={item.image} alt={`업로드된 이미지 ${item.id}`} />
                  </td>
                  <td className={styles.historyTitle}>{item.certNumber}</td>
                  <td>{item.uploadDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.historyPagination}>

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
  );
}