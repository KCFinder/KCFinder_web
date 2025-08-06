import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MenuBox from '../../component/menuBox';
import styles from './Login.module.css';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const path = '/auth';
  const title = '로그인';

    const [isServiceAvailable, setIsServiceAvailable] = useState(true);

  // 1. 사용자 입력 값을 관리할 상태
  const [formData, setFormData] = useState({
    userId: '',
    userPassword: '',
  });

  // 2. 입력 값 변경 시 호출되는 핸들러 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 3. 로그인 버튼 클릭 시 호출될 함수 (폼 제출 핸들러)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 간단한 유효성 검사
    if (!formData.userId || !formData.userPassword) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // 4. 로그인 API 요청
      const response = await axios.post(`${API_BASE_URL}/api/user/signin`, formData);

      // 백엔드에서 받은 사용자 정보
      const user = response.data;

      // AuthContext의 login 함수에 사용자 정보를 전달합니다.
      login(user);

      alert('로그인에 성공했습니다!');
      navigate('/main');

    } catch (error) {
      console.error('로그인 실패:', error);
      if (error.response) {
        // 서버에서 보낸 오류 메시지 표시
        alert(`로그인 실패: ${error.response.data.message || '아이디 또는 비밀번호가 올바르지 않습니다.'}`);
      } else if (error.request) {
        // 네트워크 오류 등 서버에 응답을 받지 못한 경우
        alert('로그인 실패: 서버에 연결할 수 없습니다. CORS 설정을 확인해주세요.');
      } else {
        // 그 외 오류
        alert('로그인 실패: 알 수 없는 오류가 발생했습니다.');
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
              <div className={styles.loginTitle}>
                <h2>{title}</h2>
              </div>
              <input
                  type="text"
                  name="userId"
                  placeholder="아이디"
                  className={styles.input}
                  value={formData.userId}
                  onChange={handleChange}
              />
              <input
                  type="password"
                  name="userPassword"
                  placeholder="비밀번호"
                  className={styles.input}
                  value={formData.userPassword}
                  onChange={handleChange}
              />
              <span>아이디 / 비밀번호 찾기</span>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.loginButton}>로그인</button>
                <div className={styles.buttonDivider} />
                <button className={styles.kakaoButton}>카카오 로그인</button>
                <button className={styles.naverButton}>네이버 로그인</button>
                <div className={styles.buttonDivider} />
              </div>
            </form>
            {/* 회원가입 버튼은 폼 바깥에 두거나, 폼 안에 두고 type="button"으로 설정해야 onSubmit 이벤트가 발생하지 않습니다. */}
            <button className={styles.memberButton} onClick={() => navigate('/sign-up')}>회원가입</button>
          </div>
        </div>
      </div>
  );
}