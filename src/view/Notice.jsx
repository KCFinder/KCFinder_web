import SectionWrapper from '../wrapper/SectionWrapper';
import noticeList from '../constants/noticeData';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/ui/Pagination';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import NoticeTable from '../components/ui/notice/NoticeTable';
import ContentsWrapper from '../wrapper/ContentsWrapper';

export default function Notice() {
  const navigate = useNavigate();

  // 날짜 형식 변환 함수 (25.02.08 → 25-02-08)
  const formatDate = dateString => {
    return dateString.replace(/\./g, '-');
  };

  const sortedNoticeList = useMemo(() => {
    return [...noticeList].sort((a, b) => {
      // 날짜 비교 (내림차순)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [noticeList]);

  const handleNoticeClick = noticeId => {
    navigate(`/notice/${noticeId}`);
  };

  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='notice' />
        <ContentsWrapper>
          <PageHeader title='공지사항' />
          <NoticeTable
            sortedNoticeList={sortedNoticeList}
            handleNoticeClick={handleNoticeClick}
            formatDate={formatDate}
          />
          <Pagination totalPage={10} />
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
