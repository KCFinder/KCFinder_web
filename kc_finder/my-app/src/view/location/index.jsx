import React from 'react'
import styles from './Location.module.css';
import MenuBox from '../../component/menuBox';

export default function Location() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path="/introduction" />
        <div className={styles.box}>
          <h2>오시는 길</h2>
          <div>
            <div className={styles.map}>
              지도
            </div>
            <div className={styles.locationInfo}>
              <span><img src="" alt="" />아이콘</span>
              <span>부산광역시 부산진구 전포대로 000번길</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
