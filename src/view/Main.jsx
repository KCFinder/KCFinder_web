import { useState } from 'react';
import MainWrapper from '../wrapper/MainWrapper';
import BannerSection from '../components/section/main/BannerSection';
import ImgUpLoadSection from '../components/section/main/ImgUpLoadSection';
import AISection from '../components/section/main/AISection';
import MainBottomSection from '../components/section/main/MainBottomSection';
import VerifyCategorySection from '../components/section/main/VerifyCategorySection';

function RenewalPopup({ onClose }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none'
          aria-label='닫기'
        >
          &times;
        </button>

        <div className='flex flex-col items-center text-center gap-4'>
          <div className='bg-gray-300 rounded-full p-3'>
            <svg
              className='w-8 h-8 text-blue-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z'
              />
            </svg>
          </div>

          <h2 className='text-xl font-bold text-gray-800'>
            홈페이지 리뉴얼 안내
          </h2>
          <p className='text-gray-500 text-sm leading-relaxed'>
            현재 홈페이지 리뉴얼 작업이 진행 중입니다.
            <br />
            문의 사항은 아래 연락처로 보내주세요.
          </p>

          <div className='w-full  rounded-xl p-4 flex flex-col gap-3 text-sm'>
            <a
              href='https://blog.naver.com/yeonolife'
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors'
            >
              <svg
                className='w-5 h-5 shrink-0'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z' />
              </svg>
              blog.naver.com/yeonolife
            </a>

            <a
              href='mailto:yeonho4698@gamil.com'
              className='flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors'
            >
              <svg
                className='w-5 h-5 shrink-0'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
              yeonho4698@gamil.com
            </a>
          </div>

          <button
            onClick={onClose}
            className='mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-colors'
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Main() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <MainWrapper>
      {showPopup && <RenewalPopup onClose={() => setShowPopup(false)} />}
      <BannerSection />
      <ImgUpLoadSection />
      <AISection />
      <VerifyCategorySection />
      <MainBottomSection />
    </MainWrapper>
  );
}
