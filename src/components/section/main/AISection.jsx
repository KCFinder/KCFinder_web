import { useEffect, useRef, useState } from 'react';
import AIImg from '../../../asset/img/MainAIImg.png';

export default function AISection() {
  const sectionRef = useRef(null);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 섹션이 화면에 보이기 시작하면 스케일 계산
      const sectionTop = rect.top;

      // 섹션이 화면에 들어오는 정도에 따라 0.85 ~ 1.0 사이로 스케일 조절
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.5)),
      );

      const newScale = 0.85 + progress * 0.15;
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className='overflow-hidden'>
      <section className='relative'>
        <img
          src={AIImg}
          alt='banner'
          className='w-full md:h-screen object-cover transition-transform duration-100 ease-out'
          style={{ transform: `scale(${scale})` }}
        />
        <div className='absolute bottom-6 left-6 md:bottom-16 md:left-16 text-white font-bold text-sm md:text-5xl leading-relaxed'>
          <p data-aos='fade-up'>KCfinder의 AI모델은 딥러닝 기반</p>
          <p data-aos='fade-up' data-aos-delay='100'>
            이미지 인식 시스템으로,
          </p>
          <p data-aos='fade-up' data-aos-delay='200'>
            <span className='text-red-500'>96만개의</span> kc인증 제품과 수십만
            개의
          </p>
          <p data-aos='fade-up' data-aos-delay='300'>
            기자재 이미지를 학습하여 동일 제품을 식별합니다.
          </p>
        </div>
      </section>
    </div>
  );
}
