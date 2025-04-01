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
                {/* <a href="/main">개인정보처리 방침</a>
                <a href="/main">서비스이용약관</a> */}
              </div>
            </li>
            <li>
              <span>
              KCfinder ㅣ 대표 : 이현민 ㅣ 대표번호 : 010-3300-4698
                <br />
                부산광역시 동구 초량동 1194-5 205호  | 이메일 : &nbsp;
                <a href="mailto:yeonho4698@gmail.com">
                yeonho4698@gmail.com
                </a>
              </span>
              <span>
                Copyright 2025 © KCfinder All Rights Reserved.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>

  )
}
