import React from 'react'
import styles from './SignUp.module.css';
import MenuBox from '../../component/menuBox';

export default function SignUp() {
  const path = '/auth';
  const title = '회원가입';

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
