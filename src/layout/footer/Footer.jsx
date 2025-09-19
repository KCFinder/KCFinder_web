import footerLogo from '../../asset/logo/footerLogo.svg';
export default function Footer() {
  return (
    <footer className='bg-gray-700 py-12'>
      <div className='container mx-auto'>
        <ul className='flex items-center gap-5 text-white font-semibold'>
          <img
            src={footerLogo}
            alt='footerlogo'
            className='my-4 mx-5 md:mx-0 w-[120px] h-[30px] md:w-[180px] md:h-[50px]'
          />
          <li className='mt-2 text-xs md:text-base'>개인정보처리 방침</li>
          <li className='mt-2 text-xs md:text-base'>서비스 이용약관</li>
        </ul>
        <ul className='flex items-center gap-4 text-gray-500 text-sm px-5 md:px-0'>
          <li>
            <p>
                케이씨파인더
              <br className='md:hidden' />
              ㅣ 대표 : 이현민
              <br className='md:hidden' />
              ㅣ 대표번호 : 010-3300-4698
              <br />
              ㅣ 부산광역시 부산진구 동천로116
              <br className='md:hidden' />
               | 이메일 : yeonho4698@gmail.com
            </p>
          </li>
        </ul>
      </div>
    </footer>
  );
}
