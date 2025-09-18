import { useState, useEffect } from 'react';
import SectionWrapper from '../wrapper/SectionWrapper';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';
import ResultSection from '../components/section/findKc/ResultSection';
import ProductsUploadListTableSection from '../components/section/findKc/ProductsUploadListTableSection';
import { findMyKc } from '../api/myKc';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MyKc() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { user } = useAuth();
  console.log('🚀 ~ MyKc ~ userData:', user);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 1,
  });

  const [productsUploadList, setProductsUploadList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let cancel = false;
    const fetchProductsUploadList = async () => {
      try {
        console.log('FindKc 페이지 로드');
        const response = await findMyKc(user.data, page);
        if (cancel) return;

        console.log('API 응답:', response);

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
  }, [page]);

  const validItems = productsUploadList.filter(
    item => item.kcCertificationNum && item.kcCertificationNum.trim() !== '',
  );

  useEffect(() => {
    if (validItems.length > 0 && !selectedItem) {
      setSelectedItem(validItems[0]);
    }
  }, [validItems, selectedItem]);

  const handleItemSelect = item => {
    setSelectedItem(item);
  };

  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='services' />
        <ContentsWrapper>
          <PageHeader title='동일 기자재 찾기' />
          <ResultSection selectedItem={selectedItem} />
          <ProductsUploadListTableSection
            onItemSelect={handleItemSelect}
            productsUploadList={productsUploadList}
          />
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
