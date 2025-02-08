import React from 'react'
import styles from './PageSkeleton.module.css';
import MenuBox from '../menuBox';

export default function PageSkeleton({ path, title }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path={path} />
        <div className={styles.box}>
          <h2>{title}</h2>
          <div className={styles.locationInfo}>
          </div>
        </div>
      </div>
    </div>
  )
}
