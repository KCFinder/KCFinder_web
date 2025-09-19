// src/components/ui/notice/NoticeTable.jsx
import { useEffect, useState } from 'react';
import { getNoticeList } from '../../../api/main';
import Pagination from '../Pagination';
import { useNavigate } from 'react-router-dom';

export default function NoticeTable({ page }) {
  const [noticeList, setNoticeList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: page || 1,
    totalPage: 1,
  });

  const formatDate = date => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  const handleNoticeClick = noticeId => {
    navigate(`/notice/${noticeId}`);
  };

  useEffect(() => {
    let cancel = false;

    (async () => {
      try {
        setLoading(true);
        const res = await getNoticeList(page);
        // items 안전 파싱
        const items = res?.items ?? res?.data?.items ?? res?.data ?? [];

        // pagination 안전 파싱
        const p = res?.pagination ??
          res?.data?.pagination ?? {
            currentPage: res?.current_page ?? page ?? 1,
            totalPage: res?.total_page ?? 1,
          };

        if (!cancel) {
          setNoticeList(Array.isArray(items) ? items : []);
          setPagination({
            currentPage: Number(p.currentPage) || page || 1,
            totalPage: Number(p.totalPage) || 1,
          });
        }
      } catch (e) {
        console.error('공지 목록 조회 실패:', e);
        if (!cancel) {
          setNoticeList([]);
          setPagination({ currentPage: page || 1, totalPage: 1 });
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [page]);

  if (loading) {
    return <div className='py-6 text-center text-gray-500'>불러오는 중…</div>;
  }

  if (!noticeList.length) {
    return (
      <>
        <div className='py-6 text-center text-gray-500'>
          공지사항이 없습니다.
        </div>
        <Pagination totalPage={pagination.totalPage} />
      </>
    );
  }

  return (
    <>
      <table className='w-full'>
        <thead>
          <tr className='text-left border-t-2 bg-primary-100/10 border-primary-100 whitespace-nowrap'>
            <th className='p-4 text-center'>번호</th>
            <th className='p-4'>제목</th>
            <th className='p-4 text-center'>작성일</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map(notice => (
            <tr
              key={notice.notice_id}
              onClick={() => handleNoticeClick(notice.notice_id)}
              className='cursor-pointer border-b border-gray-300'
            >
              <td className='p-4 text-center'>{notice.notice_id}</td>
              <td className='text-left p-4 max-w-[150px] text-sm md:text-base md:max-w-full truncate'>
                {notice.title}
              </td>
              <td className='py-4 text-gray-500 text-sm md:text-base text-center'>
                {formatDate?.(notice.create_date ?? notice.date ?? '')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPage={pagination.totalPage} />
    </>
  );
}
