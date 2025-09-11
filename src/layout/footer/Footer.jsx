import footerLogo from '../../asset/logo/footerLogo.svg';
export default function Footer() {
  return (
    <footer className='bg-gray-700 py-12 hidden md:block'>
      <div className='container mx-auto'>
        <ul className='flex items-center gap-5 text-white font-semibold'>
          <img src={footerLogo} alt='footerlogo' className='my-4' />
          <li className='mt-2'>개인정보처리 방침</li>
          <li className='mt-2'>서비스 이용약관</li>
        </ul>
        <ul className='flex items-center gap-4 text-gray-500 text-sm'>
          <li>
            <p>
              케이씨파인더 ㅣ 대표 : 홍길동 ㅣ 대표번호 : 051-000-0000
              <br />
              부산광역시 부산진구 전포대로 000번길 | 사업자번호 : 000-00-000005
              | 이메일 : help@example.kr
            </p>
          </li>
        </ul>
      </div>
    </footer>
  );
}
