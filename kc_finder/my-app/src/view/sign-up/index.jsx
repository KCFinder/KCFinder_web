import React, { useState } from 'react'
import styles from './SignUp.module.css';
import MenuBox from '../../component/menuBox';

export default function SignUp() {
  const path = '/auth';
  const title = '회원가입';

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
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path={path} />
        <div className={styles.box}>
          <div className={styles.guideInfo}>
            <div className={styles.registerTitle}>
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
            <input
              type="email"
              placeholder="이메일"
              className={styles.input}
            />
            <input
              type="tel"
              placeholder="전화번호"
              className={styles.input}
            />
            <button className={styles.registerButton}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}
