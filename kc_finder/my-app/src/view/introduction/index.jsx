import React from 'react'
import styles from './Introduction.module.css';
import MenuBox from '../../component/menuBox';
import buildingImg from '../../asset/img/building.jpg'

export default function Introduction() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MenuBox className={styles.menubox} path="/introduction" />
        <div className={styles.box}>
          <h2>회사소개</h2>
          <div className={styles.boxText}>
            <div className={styles.boxText_title}>
              <strong>
                ㈜케이씨파인더는 산업용 기자재의 이미지 인식 및 분류에 특화된 AI 기술 기업입니다.
              </strong>
            </div>
            <div className={styles.boxText_content}>
              <p>당사는 제조업 현장의 디지털 전환을 선도하며 산업 현장의 효율성과 정확성을 혁신적으로 향상시키고 있습니다.</p>

              <p>우리의 핵심 기술은 딥러닝 기반의 이미지 인식 시스템으로, 수십만 개의 산업용 기자재 이미지를 학습하여 부품을 식별하고 분류할 수 있습니다.</p>
              
              <p>이는 산업 현장에서 발생하는 부품 식별 오류를 최소화하고, 재고 관리의 정확성을 크게 향상시킵니다.
                우리의 솔루션은 단순한 이미지 인식을 넘어, 전체 공급망 관리 시스템과 유기적으로 연동됩니다.
                실시간 재고 현황 파악, 자동 발주 시스템, 품질 관리 등 통합적인 서비스를 제공하여 고객사의 운영 효율성을 극대화합니다.</p>
            </div>
          </div>
          <div className={styles.boxImg}>
            <img src={buildingImg} alt="회사 이미지" />
          </div>
        </div>
      </div>
    </div>
  )
}
