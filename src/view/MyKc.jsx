import { useState, useEffect } from 'react';
import SectionWrapper from '../wrapper/SectionWrapper';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';
import FindMyKcResultSection from '../components/section/myKc/FindMyKcResultSection';
import MyKCTableSection from '../components/section/myKc/MyKCTableSection';
import { findMyKc } from '../api/myKc';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyKc() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 1,
  });

  const [productsUploadList, setProductsUploadList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      alert('로그인 후 이용 가능한 서비스입니다.');
      navigate('/login');
      return;
    }
    let cancel = false;
    const fetchProductsUploadList = async () => {
      try {
        const response = await findMyKc(user, page);
        console.log('🚀 ~ fetchProductsUploadList ~ response:', response);
        if (cancel) return;

        setPagination({
          currentPage: response.data.pagination.currentPage,
          totalPage: response.data.pagination.totalPage,
        });

        setProductsUploadList(response.data.items);
      } catch (err) {
        console.error('findKc 호출 실패:', err);
      }
    };
    fetchProductsUploadList();
    return () => {
      cancel = true;
    };
  }, [page, loading, user]);

  const validItems = productsUploadList.filter(
    item => item.kcCertificationNum && item.kcCertificationNum.trim() !== '',
  );

  useEffect(() => {
    if (validItems.length > 0 && !selectedItem) {
      setSelectedItem(validItems[0]);
    }
    if (validItems.length === 0) {
      setSelectedItem(null);
    }
  }, [validItems, selectedItem]);

  const handleItemSelect = item => {
    setSelectedItem(item);
  };

  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='my/finder' />
        <ContentsWrapper>
          <PageHeader title='나의 기자재 찾기' />
          <FindMyKcResultSection
            selectedItem={selectedItem}
            validItems={validItems}
          />
          <MyKCTableSection
            onItemSelect={handleItemSelect}
            productsUploadList={productsUploadList}
            totalPage={pagination.totalPage}
          />
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
