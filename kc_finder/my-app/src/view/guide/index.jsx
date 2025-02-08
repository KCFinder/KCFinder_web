import React from 'react'
import styles from './Guide.module.css';
import MenuBox from '../../component/menuBox';

export default function Guide() {
  const path = '/services';
  const title = '이용방법';
  return <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <MenuBox className={styles.menubox} path={path} />
          <div className={styles.box}>
            <h2>{title}</h2>
          <div className={styles.guideInfo}>
          </div>
          </div>
        </div>
      </div>
  </>
}
