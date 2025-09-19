import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../api/user';
import { SignUpSchema } from '../../../schema/SignUpSchema';
import { checkId } from '../../../api/user';

export default function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: '',
    userPassword: '',
    confirmPassword: '',
    userEmail: '',
    userPhone: '',
  });

  const [checkIdResponse, setCheckIdResponse] = useState(null);

  const [formErrors, setFormErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckId = async () => {
    const checkIdResponse = await checkId(formData.userId);
    setCheckIdResponse(checkIdResponse);
    if (checkIdResponse.code === 1) {
      alert('사용 가능한 아이디입니다.');
      return;
    }
    if (checkIdResponse.code === -1) {
      alert(checkIdResponse.message);
      return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('submit실행됨');

    const result = SignUpSchema.safeParse(formData);

    if (!result.success) {
      const errors = {};
      if (result.error?.issues) {
        result.error.issues.forEach(err => {
          const key = err.path?.[0] || 'form';
          if (!errors[key]) {
            errors[key] = [];
          }
          errors[key].push(err.message);
        });
      }
      console.log('세팅할 errors:', errors);
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    if (checkIdResponse.code === -1) {
      alert(checkIdResponse.message);
      return;
    }

    try {
      const response = await signUp(formData);

      if (response.code === 1) {
        alert('회원가입이 성공적으로 완료되었습니다!');
        navigate('/login');
      } else {
        alert(response.message);
      }
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

  useEffect(() => {
    console.log('현재 formErrors:', formErrors);
  }, [formErrors]);

  return (
    <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
      <label htmlFor='id'>
        <p>아이디</p>
      </label>
      <div className='flex gap-2'>
        <input
          type='text'
          id='id'
          name='userId'
          className='w-full p-2 border border-gray-300 rounded-md'
          onChange={handleChange}
        />
        <button
          type='button'
          className='w-fit p-2 bg-primary-100 text-white rounded-md text-xs whitespace-nowrap'
          onClick={handleCheckId}
        >
          중복확인
        </button>
      </div>
      <span className='text-sm text-gray-500'>(4자 ~20이하)</span>
      {formErrors.userId && (
        <div className='text-red-500 text-sm'>
          {formErrors.userId.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      )}
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
      <span className='text-sm text-gray-500'>
        (8~20이하, 영문, 숫자, 특수문자 중 2가지 이상을 포함)
      </span>
      {formErrors.userPassword && (
        <div className='text-red-500 text-sm'>
          {formErrors.userPassword.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      )}

      <label htmlFor='confirmPassword'>
        <p>비밀번호 확인</p>
      </label>
      <input
        type='password'
        id='confirmPassword'
        name='confirmPassword'
        className='w-full p-2 border border-gray-300 rounded-md'
        onChange={handleChange}
      />
      {formErrors.confirmPassword && (
        <div className='text-red-500 text-sm'>
          {formErrors.confirmPassword.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      )}

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
      {formErrors.userEmail && (
        <div className='text-red-500 text-sm'>
          {formErrors.userEmail.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      )}

      <label htmlFor='userPhone'>
        <p>전화번호</p>
      </label>
      <input
        type='text'
        id='userPhone'
        name='userPhone'
        placeholder='01012345678'
        className='w-full p-2 border border-gray-300 rounded-md'
        onChange={handleChange}
      />
      {formErrors.userPhone && (
        <div className='text-red-500 text-sm'>
          {formErrors.userPhone.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      )}
      <button
        type='submit'
        className='w-full p-3 bg-primary-100 text-white rounded-md mt-10'
      >
        회원가입
      </button>
    </form>
  );
}
