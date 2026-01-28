import AIImg from '../../../asset/img/MainAIImg.png';

export default function AISection() {
  return (
    <div>
      <section className='relative'>
        <img
          src={AIImg}
          alt='banner'
          className='w-full h-screen object-cover'
        />
        <div className='absolute bottom-6 left-6 md:bottom-16 md:left-16 text-white font-bold text-sm md:text-5xl leading-relaxed'>
          <p>KCfinder의 AI모델은 딥러닝 기반</p>
          <p>이미지 인식 시스템으로,</p>
          <p>
            <span className='text-red-500'>96만개의</span> kc인증 제품과 수십만
            개의
          </p>
          <p>기자재 이미지를 학습하여 동일 제품을 식별합니다.</p>
        </div>
      </section>
    </div>
  );
}
