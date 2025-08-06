import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';
import MenuBox from '../../component/menuBox';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

export default function SignUp() {
  const navigate = useNavigate();
  const path = '/auth';
  const title = '회원가입';

    const [isServiceAvailable, setIsServiceAvailable] = useState(true);

  // 1. 사용자 입력 값을 관리할 상태
  const [formData, setFormData] = useState({
    userId: '',
    userPassword: '',
    userEmail: '',
    userPhone: '',
  });

  // 2. 입력 값 변경 시 호출되는 핸들러 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 3. 회원가입 버튼 클릭 시 호출될 함수 (폼 제출 핸들러)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 간단한 유효성 검사
    if (!formData.userId || !formData.userPassword || !formData.userEmail || !formData.userPhone) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      // 4. API 요청
      const response = await axios.post(`${API_BASE_URL}/api/user/signup`, formData);

      console.log('회원가입 성공:', response.data);
      alert('회원가입이 성공적으로 완료되었습니다!');
      // 성공 후 다른 페이지로 이동하거나, 입력 폼 초기화 등의 로직 추가
      navigate('/auth/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      if (error.response) {
        // 서버가 응답을 보냈지만 오류 상태 코드인 경우
        alert(`회원가입 실패: ${error.response.data.message || '알 수 없는 오류'}`);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우 (네트워크 오류, CORS 등)
        alert('회원가입 실패: 서버에 연결할 수 없습니다. CORS 설정을 확인해주세요.');
      } else {
        // 그 외 오류
        alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.');
      }
    }
  };


  if (!isServiceAvailable) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <MenuBox className={styles.menubox} path={path} />
            <div className={styles.box}>
              <h2>{title}</h2>
              <div className={styles.serviceUnavailable}>
                <div className={styles.unavailableMessage}>
                  <h3>리뉴얼 중인 페이지 입니다.</h3>
                  <p>더 나은 서비스를 위해 준비 중입니다. 불편을 드려 죄송합니다.</p>
                  <p>빠른 시일 내에 새로운 모습으로 찾아뵙겠습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }


  return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <MenuBox className={styles.menubox} path={path} />
          <div className={styles.box}>
            <form className={styles.guideInfo} onSubmit={handleSubmit}>
              <div className={styles.registerTitle}>
                <h2>{title}</h2>
              </div>
              <input
                  type="text"
                  name="userId" // name 속성 추가 (중요!)
                  placeholder="아이디"
                  className={styles.input}
                  value={formData.userId}
                  onChange={handleChange}
              />
              <input
                  type="password"
                  name="userPassword" // name 속성 추가
                  placeholder="비밀번호"
                  className={styles.input}
                  value={formData.userPassword}
                  onChange={handleChange}
              />
              <input
                  // type="email"
                  type="text"
                  name="userEmail" // name 속성 추가
                  placeholder="이메일"
                  className={styles.input}
                  value={formData.userEmail}
                  onChange={handleChange}
              />
              <input
                  // type="tel"
                  type="text"
                  name="userPhone" // name 속성 추가
                  placeholder="전화번호"
                  className={styles.input}
                  value={formData.userPhone}
                  onChange={handleChange}
              />
              <button type="submit" className={styles.registerButton}>회원가입</button>
            </form>
          </div>
        </div>
      </div>
  );
}