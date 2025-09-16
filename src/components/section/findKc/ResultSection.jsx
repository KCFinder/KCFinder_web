import { Link } from 'react-router-dom';
import PageHeader from '../../ui/PageHeader';

export default function ResultSection({ selectedItem }) {
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
        <div className='flex gap-10 border-blue-50 items-center border-4 rounded-2xl p-4 relative mb-10'>
          <p className='bg-white p-2 rounded-md absolute -top-6 left-4 font-bold'>
            의뢰 이미지
          </p>
          {/* <p className='whitespace-nowrap w-20 font-bold text-sm md:text-base'>
            의뢰 이미지
          </p> */}
          <div className='flex justify-center w-full'>
            <img
              src={selectedItem.productImgPath}
              alt='회원 업로드 이미지'
              className='w-60 h-48 object-cover'
            />
          </div>
        </div>
        {/* <div className='flex gap-10 border-b border-gray-300 py-10 items-center'>
          <p className='whitespace-nowrap w-20 font-bold text-sm md:text-base'>
            동일 기자재
          </p>
          <div className='flex justify-center w-full'>
            {selectedItem.matchingKcImgUrl ? (
              <img
                src={selectedItem.matchingKcImgUrl}
                alt='동일 기자재 이미지'
                className='w-60 h-48 object-cover'
              />
            ) : (
              <div className='w-60 h-48 bg-gray-200 flex items-center justify-center'>
                <p className='text-gray-500'>매칭된 기자재 없음</p>
              </div>
            )}
          </div>
        </div> */}

        <div className='flex gap-10 border-blue-50 items-center border-4 rounded-2xl p-4 relative'>
          <p className='bg-white p-2 rounded-md absolute -top-6 left-4 font-bold'>
            동일 기자재
          </p>
          <div className='flex justify-center w-full'>
            {selectedItem.matchingKcImgUrl ? (
              <img
                src={selectedItem.matchingKcImgUrl}
                alt='동일 기자재 이미지'
                className='w-60 h-48 object-cover'
              />
            ) : (
              <div className='w-60 h-48 bg-gray-200 flex items-center justify-center'>
                <p className='text-gray-500'>매칭된 기자재 없음</p>
              </div>
            )}
          </div>
        </div>
        <div className='flex gap-10 border-b border-gray-300 py-10 items-center'>
          <p className='font-bold w-20 text-sm md:text-base'>인증번호</p>
          <p>{selectedItem.kcCertificationNum || '동일 기자재 검색 중 ...'}</p>
        </div>
        <div className='flex gap-10 border-b border-gray-300 py-10 items-center'>
          <p className='font-bold w-20 text-sm md:text-base'>링크</p>
          <p>
            {selectedItem.matchingProductLink ? (
              <a
                href={selectedItem.matchingProductLink}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:underline'
              >
                {selectedItem.matchingProductLink}
              </a>
            ) : (
              '링크 없음'
            )}
          </p>
        </div>
      </div>
    </>
  );
}
