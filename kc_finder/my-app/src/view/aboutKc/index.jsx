import React from 'react'
import styles from './AboutKc.module.css';
import MenuBox from '../../component/menuBox';

export default function AboutKc() {
  const path = '/services';
  const title = '기자재 KC';
  return <>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path={path} />
        <div className={styles.box}>
          <h2>{title}</h2>
          <div className={styles.abuotKc}>
          </div>
        </div>
      </div>
    </div>
  </>
}
