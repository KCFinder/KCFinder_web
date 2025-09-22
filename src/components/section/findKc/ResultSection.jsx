import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../ui/PageHeader';

export default function ResultSection({ selectedItem, validItems }) {
  console.log('🚀 ~ ResultSection ~ selectedItem:', selectedItem);
  const [mainRequestImage, setMainRequestImage] = useState(null);
  const [mainMatchingImage, setMainMatchingImage] = useState(null);

  useEffect(() => {
    if (selectedItem?.productImgPath?.length > 0) {
      setMainRequestImage(selectedItem.productImgPath[0]);
    } else {
      setMainRequestImage(null);
    }

    if (selectedItem?.matchingKcImgUrl) {
      if (Array.isArray(selectedItem.matchingKcImgUrl)) {
        setMainMatchingImage(selectedItem.matchingKcImgUrl[0]);
      } else {
        setMainMatchingImage(selectedItem.matchingKcImgUrl);
      }
    } else {
      setMainMatchingImage(null);
    }
  }, [selectedItem]);

  if (!selectedItem) {
    return (
      <>
        <PageHeader title='결과' className='text-black-100' />
        <div className='flex items-center justify-center py-20'>
          <p className='text-gray-500 text-lg'>
            테이블에서 항목을 선택해주세요.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <PageHeader title='결과' className='text-black-100' />
        <Link
          to='/'
          className='bg-primary-100 text-white rounded-full p-2 px-4 text-sm'
        >
          다른 이미지로 검색하기
        </Link>
      </div>

      <div className='mb-10'>
        <div className='border-blue-50 border-4 rounded-2xl p-4 relative mb-10'>
          <p className='bg-white p-2 rounded-md absolute -top-6 left-4 font-bold'>
            의뢰 이미지
          </p>

          <div className='flex gap-6'>
            <div className='flex-1 flex justify-center'>
              {mainRequestImage ? (
                <img
                  src={mainRequestImage}
                  alt='회원 업로드 이미지'
                  className='w-80 h-64 object-cover rounded-lg border'
                />
              ) : (
                <div className='w-80 h-64 bg-gray-200 flex items-center justify-center rounded-lg'>
                  <p className='text-gray-500'>이미지 없음</p>
                </div>
              )}
            </div>

            {selectedItem.productImgPath.length > 1 && (
              <div className='flex flex-col gap-2 overflow-y-auto max-h-64'>
                {selectedItem.productImgPath.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`의뢰 썸네일 ${idx + 1}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border 
                      ${mainRequestImage === img ? 'border-blue-500' : 'border-gray-300'}`}
                    onClick={() => setMainRequestImage(img)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='border-blue-50 border-4 rounded-2xl p-4 relative mb-10'>
          <p className='bg-white p-2 rounded-md absolute -top-6 left-4 font-bold'>
            동일 기자재 이미지
          </p>

          <div className='flex gap-6'>
            <div className='flex-1 flex justify-center'>
              {mainMatchingImage ? (
                <img
                  src={mainMatchingImage}
                  alt='동일 기자재 이미지'
                  className='w-80 h-64 object-cover rounded-lg border'
                />
              ) : (
                <div className='w-80 h-64 bg-gray-200 flex items-center justify-center rounded-lg'>
                  <p className='text-gray-500'>매칭된 기자재 없음</p>
                </div>
              )}
            </div>

            {Array.isArray(selectedItem.matchingKcImgUrl) &&
              selectedItem.matchingKcImgUrl.length > 1 && (
                <div className='flex flex-col gap-2 overflow-y-auto max-h-64'>
                  {selectedItem.matchingKcImgUrl.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`동일 기자재 썸네일 ${idx + 1}`}
                      className={`w-20 h-20 object-cover rounded-md cursor-pointer border 
                        ${mainMatchingImage === img ? 'border-blue-500' : 'border-gray-300'}`}
                      onClick={() => setMainMatchingImage(img)}
                    />
                  ))}
                </div>
              )}
          </div>
        </div>

        {/* 링크 섹션 - border 바깥에 위치 */}
        {selectedItem.matchingProductLink && (
          <div className='flex flex-col gap-2 mb-10'>
            <div className='flex items-center gap-2'>
              <p className='font-bold'>링크:</p>
              <a
                href={selectedItem.matchingProductLink}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:underline break-all'
              >
                {selectedItem.matchingProductLink}
              </a>
            </div>

            <p className='font-bold'>
              인증번호: {selectedItem.kcCertificationNum}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
