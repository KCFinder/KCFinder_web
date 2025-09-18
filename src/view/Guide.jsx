import SectionWrapper from '../wrapper/SectionWrapper';
import MenuBox from '../components/ui/MenuBox';

export default function Guide() {
  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='services' />
        <div className='flex-1 container mx-auto max-w-[894px] '>
          <h2 className='text-2xl font-bold text-primary-100 mb-8'>이용방법</h2>
          <p className='text-lg font-bold'>리뉴얼 중인 페이지 입니다.</p>
          <p>
            더 나은 서비스를 위해 준비 중입니다. 불편을 드려 죄송합니다.
            <br /> 빠른 시일 내에 새로운 모습으로 찾아뵙겠습니다.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
