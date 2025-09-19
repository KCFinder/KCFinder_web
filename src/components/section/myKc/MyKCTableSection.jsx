import { useState, useEffect } from 'react';
import PageHeader from '../../ui/PageHeader';
import Pagination from '../../ui/Pagination';

export default function MyKCTableSection({
  onItemSelect,
  productsUploadList = [],
  totalPage,
}) {
  const validItems = productsUploadList.filter(
    item => item.kcCertificationNum && item.kcCertificationNum.trim() !== '',
  );

  const [selectedItemId, setSelectedItemId] = useState(
    validItems[0]?.productCode || null,
  );

  useEffect(() => {
    if (validItems.length > 0 && onItemSelect && selectedItemId === null) {
      onItemSelect(validItems[0]);
      setSelectedItemId(validItems[0].productCode);
    }
  }, [validItems, onItemSelect, selectedItemId]);

  const handleRowClick = item => {
    setSelectedItemId(item.productCode);
    onItemSelect(item);
  };

  const formatDate = date => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <>
      <PageHeader title='제품 업로드 이력 목록' className='pt-10' />
      <table className='w-full text-sm md:text-base'>
        <thead className='text-primary-100 border-b-2 border-gray-500'>
          <tr className='text-primary-100'>
            <th className='py-4'>상품번호</th>
            <th className='py-4'>이미지</th>
            <th className='py-4'>인증번호</th>
            <th className='py-4'>등록일</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {productsUploadList.map(item => {
            const hasValidCertification =
              item.kcCertificationNum && item.kcCertificationNum.trim() !== '';
            const isSelected = selectedItemId === item.productCode;

            return (
              <tr
                key={item.productCode}
                className={`border-b border-gray-300 transition-colors ${
                  hasValidCertification
                    ? `cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`
                    : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => hasValidCertification && handleRowClick(item)}
              >
                <td className='py-4 px-2 text-center'>{item.index}</td>
                <td className='flex justify-center px-4 truncate max-w-[200px] md:max-w-full py-2'>
                  <img
                    src={item.productImgPath[0]}
                    alt='이미지'
                    className='w-10 h-10 object-cover md:w-20 md:h-20'
                  />
                </td>
                <td className='text-center px-4 whitespace-nowrap max-w-[100px] truncate'>
                  {item.kcCertificationNum || '검색 중'}
                </td>
                <td className='text-center px-2 whitespace-nowrap'>
                  {formatDate(item.createDate)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination totalPage={totalPage} />
    </>
  );
}
