import React from 'react'
import styles from './AboutKc.module.css';
import MenuBox from '../../component/menuBox';
import kc_logo from "../../asset/img/kc-logo.png"
import kc_img from "../../asset/img/about_kc.jpg"

export default function AboutKc() {
  const path = '/services';
  const title = 'KC 인증이란? ';
  return <>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path={path} />
        <div className={styles.box}>
          <h2>{title}</h2>
          <div className={styles.content}>
            <div>
              <img style={{ borderRadius: "15px" }} width={400} src={kc_img} alt="kc에 대한 이미지" />
            </div>
            <div>
              <strong>KC 인증(Korea Certification, 국가통합인증마크)</strong>은 대한민국에서 소비자의 안전을 보장하고,
              <br />
              제품의 품질과 환경 보호 기준을 충족하는지 확인하는 국가 인증 제도입니다.
              <br />
              <br />
              즉, 전기·전자 제품, 생활용품, 어린이 제품, 화학제품 등 소비자에게 영향을 줄 수 있는 제품이
              <br />
              <strong>안전한지 검증하는 과정</strong>이라고 할 수 있습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
