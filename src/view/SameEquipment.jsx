import SectionWrapper from '../wrapper/SectionWrapper';
import handShake from '../asset/img/handshake.jpg';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';

export default function SameEquipment() {
  return (
    <SectionWrapper>
      <div className='flex items-start gap-20'>
        <MenuBox menuType='services' />
        <ContentsWrapper>
          <PageHeader title='동일 기자재 신고란 ?' />
          <div className='flex flex-col gap-10 md:flex-row justify-between w-full'>
            <img
              src={handShake}
              alt='회사 이미지지'
              className='md:w-[384px] md:h-[437px] w-full h-[200px] object-cover rounded-2xl'
            />
            <div className='max-w-[450px] pt-10 md:pt-0 text-lg'>
              <p className='font-bold text-lg'>동일 기자재 신고는</p>
              <p className='pt-2 pb-4 text-lg'>
                이미 KC 인증을 받은 부품, 모듈, 기자재와 동일한 사양의 부품이나
                기자재를 사용하여 제품을 출시하거나 수입하는 경우에 추가 인증
                없이 동일한 기자재를 사용하고 있다는 사실을 신고하는 절차입니다.
              </p>
              <p className='font-bold text-lg'>
                즉, 기존에 KC 인증을 받은 부품이나 기자재를 사용하여,
              </p>
              <p>
                동일한 제품을 다시 판매하거나 유통하려고 할 때 진행하는
                절차입니다. 이 과정에서 새로운 시험 없이 기존의 인증을 인정해
                주기 때문에, 비용과 시간을 절약할 수 있습니다
              </p>
            </div>
          </div>
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
