import React from 'react'
import styles from './AboutSameEquipment.module.css'
import MenuBox from '../../component/menuBox';
import equipemnt_img from '../../asset/img/handshake.jpg';

export default function AboutSameEquipment() {
  const path = '/services';
  const title = '동일 기자재 신고란?';
  return <>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path={path} />
        <div className={styles.box}>
          <h2>{title}</h2>
          <div className={styles.content}>
            <div>
              <img style={{ borderRadius: "15px", width: "400px" }} src={equipemnt_img} alt="동일 기자재에 대한 이미지" />
            </div>
            <div>
              <p>
                <strong>동일 기자재 신고는</strong>
                <br />
                이미 KC 인증을 받은 부품, 모듈, 기자재와 동일한 사양의 부품이나 기자재를 사용하여 제품을 출시하거나 수입하는
                경우에 추가 인증 없이 동일한 기자재를 사용하고 있다는 사실을 신고하는 절차입니다.
              </p>
              <p>
                <strong>즉, 기존에 KC 인증을 받은 부품이나 기자재를 사용하여,</strong>
                <br />
                동일한 제품을 다시 판매하거나 유통하려고 할 때 진행하는 절차입니다.
                이 과정에서 새로운 시험 없이 기존의 인증을 인정해 주기 때문에, 비용과 시간을 절약할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}