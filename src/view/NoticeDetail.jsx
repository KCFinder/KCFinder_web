// src/view/NoticeDetail.jsx
import PageHeader from '../components/ui/PageHeader';
import SectionWrapper from '../wrapper/SectionWrapper';
import ContentsWrapper from '../wrapper/ContentsWrapper';
import MenuBox from '../components/ui/MenuBox';
import { getNoticeDetail } from '../api/main';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function NoticeDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const formatDate = date => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  useEffect(() => {
    let cancel = false;

    (async () => {
      try {
        setLoading(true);
        const res = await getNoticeDetail(id);
        console.log('🚀 getNoticeDetail raw response:', res);

        if (!cancel) setDetail(res.data);
        console.log('🚀 ~ NoticeDetail ~ res.data.data:', res.data);
      } catch (e) {
        console.error('공지 상세 조회 실패:', e);
        if (!cancel) setErr(e);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [id]);

  return (
    <SectionWrapper>
      <div className='flex'>
        <MenuBox menuType='notice' />
        <ContentsWrapper>
          <PageHeader title='공지사항' />

          {loading && (
            <div className='py-6 text-center text-gray-500'>불러오는 중…</div>
          )}

          {!loading && err && (
            <div className='py-6 text-center text-red-500'>
              불러오기에 실패했습니다.
            </div>
          )}

          {!loading && !err && !detail && (
            <div className='py-6 text-center text-gray-500'>
              존재하지 않는 공지입니다.
            </div>
          )}

          {!loading && !err && detail && (
            <article>
              <div className='flex flex-col md:flex-row justify-between border-b border-gray-300 pb-2'>
                <p className='md:text-lg font-bold whitespace-nowrap'>
                  {detail.title ?? '제목'}
                </p>
                <div className='flex gap-2 text-sm text-gray-500'>
                  <p>{formatDate(detail.create_date ?? detail.date ?? '')}</p>
                </div>
              </div>
              <div className='pt-6'>
                <div />
                {detail.content ?? detail.contents ?? ''}
              </div>
            </article>
          )}
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
