import { useState, useEffect } from 'react';
import SectionWrapper from '../wrapper/SectionWrapper';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';
import ResultSection from '../components/section/findKc/ResultSection';
import ProductsUploadListTableSection from '../components/section/findKc/ProductsUploadListTableSection';
import { productsUploadList } from '../constants/productsUploadList';

export default function FindKc() {
  // 인증번호가 있는 아이템들만 필터링
  const validItems = productsUploadList.filter(
    item => item.kcCertificationNum && item.kcCertificationNum.trim() !== '',
  );

  const [selectedItem, setSelectedItem] = useState(validItems[0] || null);

  const handleItemSelect = item => {
    console.log('FindKc에서 받은 아이템:', item);
    setSelectedItem(item);
  };

  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='services' />
        <ContentsWrapper>
          <PageHeader title='동일 기자재 찾기' />
          <ResultSection selectedItem={selectedItem} />
          <ProductsUploadListTableSection onItemSelect={handleItemSelect} />
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
