import React, { useState, useEffect } from 'react';
import styles from './FindKc.module.css';
import MenuBox from '../../component/menuBox';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

import Pagination from '../../component/pagenation';
import img01 from '../../asset/example/example01.jpg';
import img02 from '../../asset/example/example02.jpg';


export default function FindKc() {
  const path = '/my';
  const title = '나의 동일기자재 찾기';

  const totalPages = 5;
  const maxVisiblePages = 5;

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // 1. 사용자 제품 목록 상태
  const [userProducts, setUserProducts] = useState({});
  const [loadingUserProducts, setLoadingUserProducts] = useState(true);
  const [userProductsError, setUserProductsError] = useState(null);

  // 2. 선택된 제품의 매칭 정보 상태
  const [selectedProductCode, setSelectedProductCode] = useState(null);
  const [matchingData, setMatchingData] = useState(null);
  const [loadingMatchingData, setLoadingMatchingData] = useState(false);
  const [matchingDataError, setMatchingDataError] = useState(null);

  // 3. ✨추가된 상태: 현재 보이는 이미지의 인덱스
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentMatchingImageIndex, setCurrentMatchingImageIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  // 로그인 상태 확인 및 사용자 제품 목록 불러오기
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    const fetchUserProducts = async () => {
      try {
        setLoadingUserProducts(true);
        if (user && user.data) {
          const response = await axios.get(`${API_BASE_URL}/api/product/matching/${user.data}`);
          if (Array.isArray(response.data.data)) {
            // productCode를 기준으로 데이터를 그룹화
            const groupedProducts = response.data.data.reduce((acc, current) => {
              const { userProductCode, userProductName, userProductImgPath } = current;
              if (!acc[userProductCode]) {
                acc[userProductCode] = {
                  userProductCode,
                  userProductName,
                  userProductImgPaths: []
                };
              }
              acc[userProductCode].userProductImgPaths.push(userProductImgPath);
              return acc;
            }, {});

            setUserProducts(groupedProducts);

            const firstProductCode = response.data.data[0]?.userProductCode;
            if (firstProductCode) {
              setSelectedProductCode(Number(firstProductCode));
            }
          } else {
            console.error('API 응답 형식이 올바르지 않습니다.');
            setUserProductsError('서버로부터 올바른 데이터를 받지 못했습니다.');
          }
        }
      } catch (err) {
        console.error('사용자 제품 목록 요청 실패:', err);
        setUserProductsError('사용자 제품 목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoadingUserProducts(false);
      }
    };

    fetchUserProducts();
  }, [isAuthenticated, navigate, user]);

  // 선택된 제품에 대한 매칭 정보 불러오기
  useEffect(() => {
    const fetchMatchingData = async () => {
      if (!selectedProductCode) return;

      try {
        setLoadingMatchingData(true);
        const response = await axios.get(`${API_BASE_URL}/api/product/matching/${user.data}/${selectedProductCode}`);
        setMatchingData(response.data.data);
        setCurrentMatchingImageIndex(0);
      } catch (err) {
        console.error('매칭 제품 정보 요청 실패:', err);
        setMatchingDataError('매칭 제품 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoadingMatchingData(false);
      }
    };
    fetchMatchingData();
  }, [selectedProductCode, user]);

  const handleLinkClick = (link) => {
    window.open(link, '_blank');
  };

  const handleProductSelect = (productCode) => {
    setSelectedProductCode(productCode);
    setMatchingData(null);
    setCurrentImageIndex(0);
    setCurrentMatchingImageIndex(0);
  };

  // ✨이전 이미지로 이동하는 함수
  const goToPreviousImage = () => {
    const selectedProduct = userProducts[selectedProductCode];
    if (selectedProduct && selectedProduct.userProductImgPaths.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex - 1 + selectedProduct.userProductImgPaths.length) % selectedProduct.userProductImgPaths.length
      );
    }
  };

  // ✨다음 이미지로 이동하는 함수
  const goToNextImage = () => {
    const selectedProduct = userProducts[selectedProductCode];
    if (selectedProduct && selectedProduct.userProductImgPaths.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedProduct.userProductImgPaths.length
      );
    }
  };

    // ✨이전 매칭 이미지로 이동하는 함수
  const goToPreviousMatchingImage = () => {
    if (matchingData && matchingData.length > 1) {
      setCurrentMatchingImageIndex((prevIndex) => 
        (prevIndex - 1 + matchingData.length) % matchingData.length
      );
    }
  };

  // ✨다음 매칭 이미지로 이동하는 함수
  const goToNextMatchingImage = () => {
    if (matchingData && matchingData.length > 1) {
      setCurrentMatchingImageIndex((prevIndex) => 
        (prevIndex + 1) % matchingData.length
      );
    }
  };

















  
  const userProductList = Object.values(userProducts);
  const selectedProduct = userProducts[selectedProductCode];

  // 로딩 및 에러 상태 처리
  if (loadingUserProducts) {
    return (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <MenuBox className={styles.menubox} path={path} />
            <div className={styles.box}>
              <h2>{title}</h2>
              <div className={styles.loadingMessage}>
                <p>내 제품 목록을 불러오는 중입니다...</p>
              </div>
            </div>
          </div>
        </div>
    );
  }

  if (userProductsError || userProductList.length === 0) {
    return (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <MenuBox className={styles.menubox} path={path} />
            <div className={styles.box}>
              <h2>{title}</h2>
              <div className={styles.noDataMessage}>
                <p>{userProductsError || '아직 찾은 동일 기자재가 없습니다.'}</p>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // 데이터가 있을 때
  return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <MenuBox className={styles.menubox} path={path} />
          <div className={styles.box}>
            <h2>{title}</h2>

            <div className={styles.contentWrapper}>
              {/* 왼쪽: 내 제품 목록 */}
              {/* <div className={styles.userProductList}>
                <h3>내 제품 목록</h3>
                {userProductList.map((product) => (
                  <div
                    key={product.userProductCode}
                    className={`${styles.userProductItem} ${selectedProductCode === product.userProductCode ? styles.selected : ''}`}
                    onClick={() => handleProductSelect(product.userProductCode)}
                  >
                    <p>{product.userProductName}</p>
                    <div className={styles.userProductImageContainer}>
                      <img src={product.userProductImgPaths[0]} alt={product.userProductName} className={styles.productThumbnail} />
                    </div>
                  </div>
                ))}
              </div> */}

              {/* 오른쪽: 매칭 결과 */}
              <div className={styles.matchingResultBox}>
                <h3>매칭 결과</h3>
                {loadingMatchingData ? (
                  <p>매칭 데이터를 불러오는 중입니다...</p>
                ) : matchingDataError ? (
                  <p>{matchingDataError}</p>
                ) : matchingData && matchingData.length > 0 ? (
                <div className={styles.result}>
                  <ul>
                    <li>
                      <p><strong>내 제품<br/>이미지</strong></p>
                      <div className={styles.imageAndButtonsContainer}>
                        <button onClick={goToPreviousImage} className={styles.sliderButton}>&lt;</button>
                        <div className={styles.imageContainer}>
                          {selectedProduct && selectedProduct.userProductImgPaths.length > 0 && (
                            <img 
                              src={selectedProduct.userProductImgPaths[currentImageIndex]} 
                              alt={selectedProduct.userProductName} 
                              className={styles.productMainImage}
                            />
                          )}
                        </div>
                        <button onClick={goToNextImage} className={styles.sliderButton}>&gt;</button>
                      </div>
                    </li>
                    <li>
                      <p><strong>매칭 제품<br/>이미지</strong></p>
                      <div className={styles.imageAndButtonsContainer}>
                        <button onClick={goToPreviousMatchingImage} className={styles.sliderButton}>&lt;</button>
                        <div className={styles.imageContainer}>
                          {/* ✨ matchingData 배열의 현재 인덱스에 해당하는 이미지를 표시 */}
                          <a href={matchingData[currentMatchingImageIndex].matchingKcImgUrl} target="_blank" rel="noopener noreferrer">
                            <img
                              src={matchingData[currentMatchingImageIndex].matchingKcImgUrl}
                              alt="유사 제품 이미지"
                              className={styles.productMainImage}
                            />
                          </a>
                        </div>
                        <button onClick={goToNextMatchingImage} className={styles.sliderButton}>&gt;</button>
                      </div>
                    </li>
                    <li>
                      <p><strong>인증번호</strong></p>
                      <div>
                        {/* ✨ 현재 인덱스에 맞는 데이터 표시 */}
                        <span>{matchingData[currentMatchingImageIndex].kcCertificationNum}</span>
                      </div>
                    </li>
                    <li>
                      <p><strong>링크</strong></p>
                      <div className={styles.linkBox}>
                        {/* ✨ 현재 인덱스에 맞는 데이터 표시 */}
                        <span>{matchingData[currentMatchingImageIndex].matchingProductLink}</span>
                      </div>
                      <div>
                        {/* ✨ 현재 인덱스에 맞는 데이터 표시 */}
                        <button onClick={() => handleLinkClick(matchingData[currentMatchingImageIndex].matchingProductLink)} className={styles.goToLinkBtn}>
                          바로가기
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
                ) : (
                  <p>매칭된 제품 정보가 없습니다.</p>
                )}
              </div>

              <div className={styles.box}>
                <h2>나의 제품 업로드 이력 목록</h2>
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
        </div>
      </div>
  );
}