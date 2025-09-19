import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../../api/user';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
    e.preventDefault();

    if (!formData.userId || !formData.userPassword) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await signIn(formData);

      if (response.code === 1) {
        login(response.data);
        alert('로그인에 성공했습니다!');
        navigate('/');
      }
      if (response.code === -1) {
        alert(
          response.message ||
            response.data?.message ||
            '아이디 또는 비밀번호가 올바르지 않습니다.',
        );
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data?.message || '서버에서 오류가 발생했습니다.');
      } else if (error.request) {
        alert('서버에 연결할 수 없습니다. CORS 설정을 확인해주세요.');
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
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
