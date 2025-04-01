import React, { useState } from 'react'
import styles from './Guide.module.css';
import MenuBox from '../../component/menuBox';

export default function Guide() {
  const path = '/services';
  const title = '이용방법';
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
