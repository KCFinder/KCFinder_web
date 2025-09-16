import { useState, useEffect } from 'react';
import PageHeader from '../../ui/PageHeader';
import { productsUploadList } from '../../../constants/productsUploadList';
import Pagination from '../../ui/Pagination';

export default function ProductsUploadListTableSection({ onItemSelect }) {
  const validItems = productsUploadList.filter(
    item => item.kcCertificationNum && item.kcCertificationNum.trim() !== '',
  );

  const [selectedItemId, setSelectedItemId] = useState(
    validItems[0]?.id || null,
  );

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때만 첫 번째 아이템을 선택
    if (validItems.length > 0 && onItemSelect) {
      onItemSelect(validItems[0]);
      setSelectedItemId(validItems[0].id);
    }
  }, []); // 빈 의존성 배열로 마운트 시에만 실행

  const handleRowClick = item => {
    console.log('클릭된 아이템:', item);
    setSelectedItemId(item.id);
    onItemSelect(item);
  };

  return (
    <>
      <PageHeader title='제품 업로드 이력 목록' className='pt-10' />
      <table className='w-full text-sm md:text-base'>
        <thead className='text-primary-100 border-b-2 border-gray-500'>
          <tr className='text-primary-100'>
            <th className='py-4'>순번</th>
            <th className='py-4'>이미지</th>
            <th className='py-4'>인증번호</th>
            <th className='py-4'>등록일</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {productsUploadList.map(item => {
            const hasValidCertification =
              item.kcCertificationNum && item.kcCertificationNum.trim() !== '';
            const isSelected = selectedItemId === item.id;

            return (
              <tr
                key={item.id}
                className={`border-b border-gray-300 transition-colors ${
                  hasValidCertification
                    ? `cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`
                    : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => hasValidCertification && handleRowClick(item)}
              >
                <td className='py-4 px-2 text-center'>{item.id}</td>
                <td className='flex justify-center px-4 truncate max-w-[200px] md:max-w-full py-2'>
                  <img
                    src={item.productImgPath}
                    alt='이미지'
                    className='w-10 h-10 object-cover md:w-20 md:h-20'
                  />
                </td>
                <td className='text-center px-4 whitespace-nowrap max-w-[100px] truncate'>
                  {item.kcCertificationNum || '검색 중'}
                </td>

                <td className='text-center px-2 whitespace-nowrap'>
                  {item.date}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination totalPage={12} />
    </>
  );
}
