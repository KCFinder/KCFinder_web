import SectionWrapper from '../wrapper/SectionWrapper';
import aboutKc from '../asset/img/about_kc.jpg';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';

export default function Services() {
  return (
    <SectionWrapper>
      <div className='flex items-start gap-20'>
        <MenuBox menuType='services' />
        <ContentsWrapper>
          <PageHeader title='KC인증이란 ?' />
          <div className='flex flex-col gap-10 md:flex-row justify-between w-full'>
            <img
              src={aboutKc}
              alt='회사 이미지지'
              className='md:w-[384px] md:h-[437px] w-full h-[200px] object-cover rounded-2xl'
            />
            <div className='max-w-[450px] lg:pt-0 text-sm md:text-xl'>
              <strong>KC 인증(Korea Certification, 국가통합인증마크)</strong>은
              대한민국에서 소비자의 안전을 보장하고,
              <br />
              제품의 품질과 환경 보호 기준을 충족하는지 확인하는 국가 인증
              제도입니다.
              <br />
              <br />
              즉, 전기·전자 제품, 생활용품, 어린이 제품, 화학제품 등 소비자에게
              영향을 줄 수 있는 제품이
              <br />
              <strong>안전한지 검증하는 과정</strong>이라고 할 수 있습니다.
            </div>
          </div>
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
