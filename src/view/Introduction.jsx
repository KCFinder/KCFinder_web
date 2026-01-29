import SectionWrapper from '../wrapper/SectionWrapper';
import buildingImg from '../asset/img/building.jpg';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';

export default function Introduction() {
  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='introduction' />
        <ContentsWrapper>
          <PageHeader title='회사소개' />
          <div className='flex flex-col md:flex-row gap-10 justify-between w-full'>
            <div className='max-w-[450px] pb-10 md:pb-0'>
              <p className='text-sm md:text-xl font-bold mb-4 text-left'>
                ㈜케이씨파인더는 산업용 기자재의 이미지 인식 및 분류에 특화된 AI
                기술 기업입니다.
              </p>
              <p className='text-sm md:text-xl'>
                2020년 설립 이후, 당사는 제조업 현장의 디지털 전환을 선도하며
                산업 현장의 효율성과 정확성을 혁신적으로 향상시키고 있습니다.
                <br />
                <br />
                당사의 핵심 기술은 딥러닝 기반의 이미지 인식 시스템으로, 수십만
                개의 산업용 기자재 이미지를 학습하여 99.9%의 정확도로 부품을
                식별하고 분류할 수 있습니다. 이는 산업 현장에서 발생하는 부품
                식별 오류를 최소화하고, 재고 관리의 정확성을 크게 향상시킵니다.
                <br />
                <br />
                우리의 솔루션은 단순한 이미지 인식을 넘어, 전체 공급망 관리
                시스템과 유기적으로 연동됩니다. 실시간 재고 현황 파악, 자동 발주
                시스템, 품질 관리 등 통합적인 서비스를 제공하여 고객사의 운영
                효율성을 극대화합니다.
                <br />
                <br />
                {/* 현재 국내 주요 제조업체 100여 개사가 당사의 시스템을 도입하여
                사용 중이며, 연간 약 500만 건의 부품 인식 처리를 수행하고
                있습니다. 이를 통해 고객사들은 평균 30%의 재고 관리 비용 절감과
                40%의 작업 시간 단축 효과를 경험하고 있습니다 ` */}
              </p>
            </div>
            <img
              src={buildingImg}
              alt='회사 이미지지'
              className='w-[384px] h-[437px] object-cover'
            />
          </div>
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
