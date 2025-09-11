import SectionWrapper from '../wrapper/SectionWrapper';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';

export default function FindKc() {
  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='services' />
        <ContentsWrapper>
          <PageHeader title='동일 기자재 찾기' />
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
