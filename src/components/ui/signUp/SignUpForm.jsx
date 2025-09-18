import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../apiConfig';
import MenuBox from '../MenuBox';

export default function SignUpForm() {
  const navigate = useNavigate();

  const [isServiceAvailable, setIsServiceAvailable] = useState(true);

  const [formData, setFormData] = useState({
    userId: '',
    userPassword: '',
    userEmail: '',
    userPhone: '',
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

    if (
      !formData.userId ||
      !formData.userPassword ||
      !formData.userEmail ||
      !formData.userPhone
    ) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/signup`,
        formData,
      );

      console.log('회원가입 성공:', response.data);
      alert('회원가입이 성공적으로 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error.response) {
        alert(
          `회원가입 실패: ${error.response.data.message || '알 수 없는 오류'}`,
        );
      } else if (error.request) {
        alert(
          '회원가입 실패: 서버에 연결할 수 없습니다. CORS 설정을 확인해주세요.',
        );
      } else {
        alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form className='w-full  flex flex-col gap-4' onSubmit={handleSubmit}>
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
      <label htmlFor='email'>
        <p>이메일</p>
      </label>
      <input
        type='text'
        id='email'
        name='userEmail'
        className='w-full p-2 border border-gray-300 rounded-md'
        onChange={handleChange}
      />
      <label htmlFor='userPhone'>
        <p>전화번호</p>
      </label>
      <input
        type='text'
        id='userPhone'
        name='userPhone'
        className='w-full p-2 border border-gray-300 rounded-md'
        onChange={handleChange}
      />
      <button
        type='submit'
        className='w-full p-3 bg-primary-100 text-white rounded-md mt-10'
      >
        회원가입
      </button>
    </form>
  );
}
