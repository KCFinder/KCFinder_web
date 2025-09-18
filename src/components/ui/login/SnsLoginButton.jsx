export default function SnsLoginButton() {
  return (
    <div className='w-full max-w-[320px] pt-5 pb-5 border-b border-gray-300'>
      <button className='w-full py-3 text-black-100 bg-yellow-100 rounded-md mb-5'>
        카카오로그인
      </button>
      <button className='w-full py-3 border border-gray-300 text-gray-700 rounded-md'>
        네이버로그인
      </button>
    </div>
  );
}
