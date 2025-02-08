import React from 'react'
import styles from '../footer/Footer.module.css';
import logo from "../../asset/logo/footerLogo.svg";

export default function Footer() {
  return (
    <>
      <div className={styles.footerWrapper}>
        <div className={styles.footerContariner}>
          <ul>
            <li>
              <div className={styles.logoSection}>
                <img
                  src={logo}
                  alt="KC Finder 로고"
                />
                <a href="/main">개인정보처리 방침</a>
                <a href="/main">서비스이용약관</a>
              </div>
            </li>
            <li>
              <span>
                케이씨파인더 ㅣ 대표 : 홍길동 ㅣ 대표번호 : 051-000-0000
                <br />
                부산광역시 부산진구 전포대로 000번길 | 사업자번호 : 000-00-000005 | 이메일 :
                <a href="mailto:help@example.kr">
                  help@example.kr
                </a>
              </span>
              <span>
                Copyright 2018 © Securenet All Rights Reserved.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>

  )
}
