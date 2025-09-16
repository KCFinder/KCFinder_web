import PageHeader from '../../ui/PageHeader';
import { myKcTableList } from '../../../constants/myKcTableList';
import Pagination from '../../ui/Pagination';

export default function MyKCTableSection() {
  return (
    <>
      <PageHeader title='나의 제품 업로드 이력 목록' />
      <table className='w-full'>
        <thead className='text-primary-100 border-b-2 border-gray-500'>
          <tr>
            <th className='py-4'>순번</th>
            <th className='py-4'>업로드 이미지</th>
            <th className='py-4'>인증번호</th>
            <th className='py-4'>등록일</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {myKcTableList.map(item => (
            <tr key={item.id} className='border-b border-gray-300'>
              <td>{item.id}</td>
              <td className='flex justify-center py-4'>
                <img
                  src={item.image}
                  alt='업로드 이미지'
                  className='w-10 h-10 object-cover md:w-20 md:h-20'
                />
              </td>
              <td>{item.certificationNumber}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPage={12} />
    </>
  );
}
