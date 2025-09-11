import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../apiConfig';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const path = '/auth';
  const title = '로그인';

  const [formData, setFormData] = useState({
    userId: '',
    userPassword: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault(); // 페이지 새로고침 방지

    if (!formData.userId || !formData.userPassword) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/signin`,
        formData,
      );

      const user = response.data;
      console.log(user);
      login(user);

      alert('로그인에 성공했습니다!');
      navigate('/main');
    } catch (error) {
      console.error('로그인 실패:', error);
      if (error.response) {
        alert(
          `로그인 실패: ${error.response.data.message || '아이디 또는 비밀번호가 올바르지 않습니다.'}`,
        );
      } else if (error.request) {
        alert(
          '로그인 실패: 서버에 연결할 수 없습니다. CORS 설정을 확인해주세요.',
        );
      } else {
        alert('로그인 실패: 알 수 없는 오류가 발생했습니다.');
      }
    }
  };
  return (
    <form
      className='flex flex-col gap-2 border-b border-gray-300 pb-5'
      onSubmit={handleSubmit}
    >
      <label htmlFor='id'>
        <p>아이디</p>
      </label>
      <input
        type='text'
        id='id'
        name='userId'
        className='w-full p-2 border border-gray-300 rounded-md'
        onChange={handleChange}
      />
      <label htmlFor='password'>
        <p>비밀번호</p>
      </label>
      <input
        type='password'
        id='password'
        name='userPassword'
        className='w-full p-2 border border-gray-300 rounded-md'
        onChange={handleChange}
      />
      <Link to='/find-id' className='text-sm text-right text-gray-500'>
        아이디찾기/비밀번호 찾기
      </Link>
      <button
        type='submit'
        className='w-full p-3 bg-primary-100 text-white rounded-md'
      >
        로그인
      </button>
    </form>
  );
}
