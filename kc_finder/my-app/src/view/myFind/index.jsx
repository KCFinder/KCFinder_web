import React, { useState, useEffect } from 'react';
import styles from './FindKc.module.css';
import MenuBox from '../../component/menuBox';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

export default function FindKc() {
  const path = '/my';
  const title = '나의 동일기자재 찾기';

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
          console.log(response.data.data);
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

            const firstProductCode = response.data.data[0].userProductCode;
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
        console.log("제품코드"+selectedProductCode);
        console.log("유저코드"+user.data);
        // 백엔드 엔드포인트는 예시입니다. 실제 구현에 맞게 수정하세요.
        const response = await axios.get(`${API_BASE_URL}/api/product/matching/${user.data}/${selectedProductCode}`);
        setMatchingData(response.data.data);
        console.log("매칭데이터");
        console.log(response.data.data);
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
    setMatchingData(null); // 새로운 제품 선택 시 기존 데이터 초기화
  };

  // 로딩 상태 처리
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

  // 사용자 제품 목록이 없을 때
  const userProductList = Object.values(userProducts);
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
              {/*<div className={styles.userProductList}>*/}
              {/*  <h3>내 제품 목록</h3>*/}
              {/*  {userProductList.map((product) => (*/}
              {/*      <div*/}
              {/*          key={product.userProductCode}*/}
              {/*          className={`${styles.userProductItem} ${selectedProductCode === product.userProductCode ? styles.selected : ''}`}*/}
              {/*          onClick={() => handleProductSelect(product.userProductCode)}*/}
              {/*      >*/}
              {/*        <div className={styles.userProductImageContainer}>*/}
              {/*          {product.userProductImgPaths.map((path, imgIndex) => (*/}
              {/*              <img key={imgIndex} src={path} alt={product.userProductName}*/}
              {/*                   className={styles.productThumbnail}/>*/}
              {/*          ))}*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*  ))}*/}
              {/*</div>*/}

              {/* 오른쪽: 매칭 결과 */}
              <div className={styles.matchingResultBox}>
                {/*<h3>매칭 결과</h3>*/}
                {loadingMatchingData ? (
                    <p>매칭 데이터를 불러오는 중입니다...</p>
                ) : matchingDataError ? (
                    <p>{matchingDataError}</p>
                ) : matchingData && matchingData.length > 0 ? (
                    matchingData.map((item, index) => (
                        <div key={index} className={styles.result}>
                          <ul>
                            <li>
                              <p><strong>내 제품</strong></p>
                              {userProductList.map((product) => (
                                  <div
                                      key={product.userProductCode}
                                      className={`${styles.userProductItem} ${selectedProductCode === product.userProductCode ? styles.selected : ''}`}
                                      onClick={() => handleProductSelect(product.userProductCode)}
                                  >
                                    <div className={styles.userProductImageContainer}>
                                      {product.userProductImgPaths.map((path, imgIndex) => (
                                          <img key={imgIndex} src={path} alt={product.userProductName}
                                               className={styles.productThumbnail}/>
                                      ))}
                                    </div>
                                  </div>
                              ))}
                            </li>
                            <li>
                              <p><strong>제품<br/>이미지</strong></p>
                              <div className={styles.myImg}>
                                <a href={item.matchingKcImgUrl} target="_blank" rel="noopener noreferrer">
                                  <img src={item.matchingKcImgUrl} alt="유사 제품 이미지"/>
                                </a>
                              </div>
                            </li>
                            <li>
                              <p><strong>인증번호</strong></p>
                              <div>
                                <span>{item.kcCertificationNum}</span>
                              </div>
                            </li>
                            <li>
                              <p><strong>링크</strong></p>
                              <div className={styles.linkBox}>
                                <span>{item.matchingProductLink}</span>
                              </div>
                              <div>
                                <button onClick={() => handleLinkClick(item.matchingProductLink)} className={styles.goToLinkBtn}>
                                  링크 바로가기
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>
                    ))
                ) : (
                    <p>매칭된 제품 정보가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}