import SectionWrapper from '../wrapper/SectionWrapper';
import { useNavigate } from 'react-router-dom';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import NoticeTable from '../components/ui/notice/NoticeTable';
import ContentsWrapper from '../wrapper/ContentsWrapper';
import { useSearchParams } from 'react-router-dom';

export default function Notice() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='notice' />
        <ContentsWrapper>
          <PageHeader title='공지사항' />
          <NoticeTable page={page} />
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
