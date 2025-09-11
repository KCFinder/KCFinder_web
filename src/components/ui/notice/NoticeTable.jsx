export default function NoticeTable({
  sortedNoticeList,
  handleNoticeClick,
  formatDate,
}) {
  return (
    <table className='w-full'>
      <thead>
        <tr className='text-left border-t-2 bg-primary-100/10 border-primary-100'>
          <th className='p-4 text-center'>번호</th>
          <th className='p-4 '>제목</th>
          <th className='p-4 '>작성일</th>
        </tr>
      </thead>
      <tbody className='text-left'>
        {sortedNoticeList.map(notice => (
          <tr
            key={notice.noticeId}
            onClick={() => handleNoticeClick(notice.noticeId)}
            className='cursor-pointer border-b border-gray-300'
          >
            <td className='p-4 text-center'>{notice.id}</td>
            <td className='text-left p-4'>{notice.title}</td>
            <td className='p-4 text-gray-500'>{formatDate(notice.date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
