import { cn } from '../../../lib/utils';

import banner from '../../../asset/img/banner.jpg';
export default function BannerSection() {
  return (
    <section className='relative pt-12 w-full'>
      <img
        src={banner}
        alt='banner'
        className='w-full h-[200px] md:h-[360px] object-cover'
      />
      <p
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'font-bold text-white text-sm md:text-4xl w-4/5 text-center',
        )}
      >
        이미지만으로 손쉽게 인증된 제품을 찾아보고 <br /> 동일 기자재 신고를
        통해 시험비를 절감 해보세요
      </p>
    </section>
  );
}
