import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import SectionWrapper from '../wrapper/SectionWrapper';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';
import MyKCTableSection from '../components/section/myKc/MyKCTableSection';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import FindMyKcResultSection from '../components/section/myKc/FindMyKcResultSection';

export default function MyKc() {
  const [userProducts, setUserProducts] = useState({});
  const [loadingUserProducts, setLoadingUserProducts] = useState(true);
  const [userProductsError, setUserProductsError] = useState(null);

  // 2. 선택된 제품의 매칭 정보 상태
  const [selectedProductCode, setSelectedProductCode] = useState(null);
  const [matchingData, setMatchingData] = useState(null);
  const [loadingMatchingData, setLoadingMatchingData] = useState(false);
  const [matchingDataError, setMatchingDataError] = useState(null);
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();
  // if (!isAuthenticated) {
  //   navigate('/login');
  //   return;
  // }

  // 1. 사용자 제품 목록 상태

  // 로그인 상태 확인 및 사용자 제품 목록 불러오기
  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        setLoadingUserProducts(true);
        if (user && user.data) {
          const response = await axios.get(
            `${API_BASE_URL}/api/product/matching/${user.data}`,
          );
          console.log('response.data.data', response.data.data);
          if (Array.isArray(response.data.data)) {
            // productCode를 기준으로 데이터를 그룹화
            const groupedProducts = response.data.data.reduce(
              (acc, current) => {
                const { userProductCode, userProductName, userProductImgPath } =
                  current;
                if (!acc[userProductCode]) {
                  acc[userProductCode] = {
                    userProductCode,
                    userProductName,
                    userProductImgPaths: [],
                  };
                }
                acc[userProductCode].userProductImgPaths.push(
                  userProductImgPath,
                );
                return acc;
              },
              {},
            );

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
        console.log('제품코드' + selectedProductCode);
        console.log('유저코드' + user.data);
        const response = await axios.get(
          `${API_BASE_URL}/api/product/matching/${user.data}/${selectedProductCode}`,
        );
        setMatchingData(response.data.data);
        console.log(
          '🚀 ~ fetchMatchingData ~ response.data.data:',
          response.data.data,
        );
        console.log('매칭데이터');
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

  const handleLinkClick = link => {
    window.open(link, '_blank');
  };

  const handleProductSelect = productCode => {
    setSelectedProductCode(productCode);
    setMatchingData(null); // 새로운 제품 선택 시 기존 데이터 초기화
  };

  // 로딩 상태 처리
  if (loadingUserProducts) {
    return <p>내 제품 목록을 불러오는 중입니다...</p>;
  }

  // 사용자 제품 목록이 없을 때
  const userProductList = Object.values(userProducts);
  // if (userProductsError || userProductList.length === 0) {
  //   return (
  //     <SectionWrapper>
  //       <div className='flex gap-20'>
  //         <MenuBox menuType='my/finder' />
  //         <ContentsWrapper>
  //           <PageHeader title='나의 기자재' />
  //           <p className='font-bold'>매칭 결과</p>
  //           <p className='pb-10'>매칭된 제품 정보가 없습니다.</p>
  //           {/* <FindMyKcResultSection matchingData={userProducts} /> */}
  //           {/* <MyKCTableSection userProducts={userProducts} /> */}
  //           <PageHeader title='나의 제품 업로드 이력 목록' />
  //           <p>아직 찾은 동일 기자재가 없습니다.</p>
  //         </ContentsWrapper>
  //       </div>
  //     </SectionWrapper>
  //   );
  // }

  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='my/finder' />
        <ContentsWrapper>
          <PageHeader title='나의 기자재' />
          <FindMyKcResultSection
            matchingData={userProducts}
            selectedProduct={userProducts[selectedProductCode]}
          />
          <MyKCTableSection />
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
