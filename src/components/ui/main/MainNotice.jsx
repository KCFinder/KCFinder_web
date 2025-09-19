import { Link } from 'react-router-dom';
import RightArrow from '../../../asset/icon/RightArrow';
import { getNoticeList } from '../../../api/main';
import { useEffect, useState } from 'react';

export default function MainNotice() {
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    const fetchNoticeList = async () => {
      const response = await getNoticeList(1);
      console.log('🚀 ~ fetchNoticeList ~ response123:', response);
      setNoticeList(response.items);
    };
    fetchNoticeList();
  }, []);
  return (
    <div className='flex flex-col gap-2 w-full max-w-[612px] h-[218px] shadow-md p-4 rounded-xl'>
      <div className='flex justify-between'>
        <p className='text-2xl font-bold text-left w-full border-b border-gray-400 pb-2'>
          공지사항
        </p>
        <Link to='/notice' className='flex items-center pb-2'>
          <RightArrow />
        </Link>
      </div>

      <ul>
        {noticeList.slice(0, 3).map(notice => (
          <li key={notice.notice_id} className='border-b border-gray-300 py-2'>
            <Link
              to={`/notice/${notice.notice_id}`}
              className='flex justify-between'
            >
              <p className='text-gray-700 truncate'>{notice.title}</p>
              <p className='text-gray-500 truncate'>{notice.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
