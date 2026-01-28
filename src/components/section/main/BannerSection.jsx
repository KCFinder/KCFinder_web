import { cn } from '../../../lib/utils';
import KCfinderMainImg from '../../../asset/img/KCfindeMainImg.png';
import { featureCards } from '../../../constants/mainFlow';

export default function BannerSection() {
  return (
    <section className='relative w-full mb-60'>
      <img
        src={KCfinderMainImg}
        alt='banner'
        className='w-full h-[200px] md:h-[660px] object-cover'
      />
      <div
        className={cn(
          'absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2',
          'w-full max-w-[1280px] text-left px-4',
        )}
      >
        <p className='font-bold text-white text-sm md:text-5xl mb-8'>
          이미지만으로 손쉽게 인증된 제품을 찾아보고 <br /> 동일 기자재 신고를
          통해 시험비를 절감 해보세요.
        </p>

        <div className='flex gap-4 mt-8'>
          <button className='bg-primary-100 text-white px-6 py-3 rounded-full hover:bg-primary-200 transition-colors'>
            동일 기자재 찾기 →
          </button>
          <button className='bg-transparent border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-colors'>
            💬 문의하기
          </button>
        </div>
      </div>

      {/* 겹쳐지는 카드 섹션 */}
      <div className='absolute -bottom-40 left-1/2 -translate-x-1/2 w-full px-4'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-[1440px] mx-auto'>
          {featureCards.map((card, index) => (
            <div
              key={index}
              className={cn(
                'bg-blue-50  shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow h-[300px]',
                index % 2 === 0 ? 'mt-0' : 'mt-12',
              )}
            >
              <div className='text-4xl mb-4 flex items-center justify-center flex-shrink-0'>
                {card.icon}
              </div>
              <h3 className='font-bold text-sm md:text-xl mb-2 text-blue-900 flex-shrink-0'>
                {card.title}
              </h3>
              <p className='text-xs md:text-base text-gray-700 whitespace-pre-line'>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
