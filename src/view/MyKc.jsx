import SectionWrapper from '../wrapper/SectionWrapper';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';

export default function MyKc() {
  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='my/finder' />
        <ContentsWrapper>
          <PageHeader title='나의 기자재' />
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
