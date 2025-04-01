import React, { useState } from 'react'
import MenuBox from '../../component/menuBox';
import styles from './Login.module.css';

export default function Login() {
  const path = '/auth';
  const title = '로그인';

    const [isServiceAvailable, setIsServiceAvailable] = useState(false);
  
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
  
  
  const navContent =
  {
    name: "로그인/회원가입",
    path: "/login",
    dropdownItems: [
      { name: "로그인", path: "/login" },
      { name: "회원가입", path: "/sign-up" },
    ],
  }

  return <>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path={path} />
        <div className={styles.box}>

          <div className={styles.guideInfo}>
            <div className={styles.loginTitle}>
              <h2>{title}</h2>
            </div>
            <input
              type="text"
              placeholder="아이디"
              className={styles.input}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className={styles.input}
            />
            <span>아이디 / 비밀번호 찾기</span>
            <div className={styles.buttonGroup}>
              <button className={styles.loginButton}>로그인</button>
              <div className={styles.buttonDivider} />
              <button className={styles.kakaoButton}>카카오 로그인</button>
              <button className={styles.naverButton}>네이버 로그인</button>
              <div className={styles.buttonDivider} />
            </div>
            <button className={styles.memberButton}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  </>
}