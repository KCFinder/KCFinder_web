import { useState } from 'react';
import Cup from '../../../asset/img/Cup.png';
import Concent from '../../../asset/img/Concent.png';
import Block from '../../../asset/img/Block.png';

const categories = [
  {
    id: 1,
    title: '생활용품',
    image: Cup,
    description:
      '생활용품 KC 인증 품목에는 접이식 의자, 책상, 침대, 매트리스 같은 가구류 가죽제품(가방, 벨트, 장갑 등), 신발류(운동화, 샌들, 슬리퍼 등), 압력솥, 프라이팬, 주전자, 플라스틱 및 스테인리스 식기, 보온병, 학용품(연필, 지우개, 색연필 등), 자전거, 킥보드, 인라인스케이트, 구명조끼, 헬멧, 등산용 로프, 카라비너 같은 스포츠·레저용품, 가정용 화장품 거치대, 액세서리류, 플라스틱 생활 잡화, 도마, 밀폐용기 같은 생활용 플라스틱 제품등',
    penalties: [
      {
        title: '판매 금지 및 유통 중지',
        items: [
          'KC 인증이 없는 제품은 국내에서 판매하거나 유통할 수 없음.',
          '이미 판매된 경우에는 리콜(판매 중지 및 회수) 명령이 내려질 수 있음.',
        ],
      },
      {
        title: '행정 처분',
        items: [
          '산업통상자원부, 국가기술표준원 등 관계 기관에서 시정명령, 판매정지, 리콜 명령을 내림.',
        ],
      },
      {
        title: '과태료 및 벌금',
        items: [
          '제품군에 따라 다르지만 최대 수천만 원의 과태료가 부과될 수 있음.',
          '고의·중대한 위반 시에는 형사처벌 대상이 될 수 있음.',
        ],
      },
      {
        title: '기업 이미지 실추',
        items: [
          'KC 인증은 소비자가 안전성을 확인하는 최소 기준이기 때문에, 인증 없는 제품 판매 시 브랜드 신뢰도에 큰 타격.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: '전자제품',
    image: Concent,
    description:
      '전자제품 KC 인증 품목에는 TV, 냉장고, 세탁기, 에어컨 같은 가전제품, 휴대폰 충전기, 보조배터리, 멀티탭, 전기장판, 전기히터, 헤어드라이어, 전기면도기, 전동칫솔 등 생활 전자기기, LED 조명기구, 전기밥솥, 전자레인지, 커피머신 등 주방가전 제품등',
    penalties: [
      {
        title: '판매 금지 및 유통 중지',
        items: [
          'KC 인증이 없는 제품은 국내에서 판매하거나 유통할 수 없음.',
          '이미 판매된 경우에는 리콜(판매 중지 및 회수) 명령이 내려질 수 있음.',
        ],
      },
      {
        title: '행정 처분',
        items: [
          '산업통상자원부, 국가기술표준원 등 관계 기관에서 시정명령, 판매정지, 리콜 명령을 내림.',
        ],
      },
      {
        title: '과태료 및 벌금',
        items: [
          '제품군에 따라 다르지만 최대 수천만 원의 과태료가 부과될 수 있음.',
          '고의·중대한 위반 시에는 형사처벌 대상이 될 수 있음.',
        ],
      },
      {
        title: '기업 이미지 실추',
        items: [
          'KC 인증은 소비자가 안전성을 확인하는 최소 기준이기 때문에, 인증 없는 제품 판매 시 브랜드 신뢰도에 큰 타격.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: '어린이제품',
    image: Block,
    description:
      '어린이제품 KC 인증 품목에는 완구(인형, 블록, 퍼즐 등), 유아용 의자, 보행기, 유모차, 카시트, 아기침대, 젖병, 젖꼭지, 어린이용 식기, 학용품(크레파스, 물감, 점토 등), 어린이용 자전거, 킥보드, 어린이 보호장구 등 13세 이하 어린이가 사용하는 제품',
    penalties: [
      {
        title: '판매 금지 및 유통 중지',
        items: [
          'KC 인증이 없는 제품은 국내에서 판매하거나 유통할 수 없음.',
          '이미 판매된 경우에는 리콜(판매 중지 및 회수) 명령이 내려질 수 있음.',
        ],
      },
      {
        title: '행정 처분',
        items: [
          '산업통상자원부, 국가기술표준원 등 관계 기관에서 시정명령, 판매정지, 리콜 명령을 내림.',
        ],
      },
      {
        title: '과태료 및 벌금',
        items: [
          '제품군에 따라 다르지만 최대 수천만 원의 과태료가 부과될 수 있음.',
          '고의·중대한 위반 시에는 형사처벌 대상이 될 수 있음.',
        ],
      },
      {
        title: '기업 이미지 실추',
        items: [
          'KC 인증은 소비자가 안전성을 확인하는 최소 기준이기 때문에, 인증 없는 제품 판매 시 브랜드 신뢰도에 큰 타격.',
        ],
      },
    ],
  },
];

export default function VerifyCategorySection() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  return (
    <div className='bg-blue-200 md:min-h-screen py-4 md:py-20'>
      <div className='w-full max-w-[1280px] mx-auto px-4'>
        <p className='text-2xl md:text-4xl font-bold' data-aos='fade-up'>
          KC인증 기자재 품목
        </p>
        <p
          className='py-2 md:pt-10 md:pb-10 text-sm md:text-base text-gray-600'
          data-aos='fade-up'
          data-aos-delay='100'
        >
          동일 기자재 품목을 알아보고 알맞게 신청하세요.
        </p>

        <div className='flex gap-6'>
          {/* 왼쪽: 카테고리 카드 */}
          <div
            className={`transition-all duration-500 ease-out ${
              selectedCategory ? 'w-1/3' : 'w-full'
            }`}
          >
            <section
              className={`grid gap-4 transition-all duration-500 ${
                selectedCategory ? 'grid-cols-1' : 'grid-cols-3'
              }`}
            >
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  {...(!selectedCategory && {
                    'data-aos': 'fade-up',
                    'data-aos-delay': index * 100,
                  })}
                  onClick={() => handleCategoryClick(category)}
                  className={`bg-blue-50 rounded-2xl flex items-center justify-center flex-col p-6 cursor-pointer
                    transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                    ${selectedCategory?.id === category.id ? 'ring-4 ring-blue-500 shadow-xl' : 'shadow-md'}
                    ${selectedCategory && selectedCategory.id !== category.id ? 'opacity-60 hover:opacity-100' : ''}
                  `}
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className={`object-contain transition-all duration-300 ${
                      selectedCategory ? 'h-24' : 'md:h-40'
                    }`}
                  />
                  <p
                    className={`font-semibold pt-6 transition-all duration-300 whitespace-nowrap ${
                      selectedCategory ? 'text-xl' : 'md:text-3xl'
                    }`}
                  >
                    {category.title}
                  </p>
                  <button className='text-blue-600 text-xs md:text-base whitespace-nowrap underline py-6 hover:text-blue-800 transition-colors'>
                    품목 자세히 보기
                  </button>
                </div>
              ))}
            </section>
          </div>

          {/* 오른쪽: 상세 설명 패널 */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              selectedCategory ? 'w-2/3 opacity-100' : 'w-0 opacity-0'
            }`}
          >
            {selectedCategory && (
              <div className='bg-blue-50 rounded-2xl p-8 h-full animate-slideIn'>
                <h3 className='text-2xl font-bold mb-4'>
                  {selectedCategory.title}
                </h3>
                <p className=' leading-relaxed mb-6'>
                  {selectedCategory.description}
                </p>

                <div className='mt-6'>
                  <h4 className='text-red-500 font-bold text-lg mb-4'>
                    KC 인증 미이행 시 불이익
                  </h4>
                  <ol className='space-y-4'>
                    {selectedCategory.penalties.map((penalty, idx) => (
                      <li
                        key={idx}
                        className='animate-fadeInUp'
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <p className='font-semibold'>
                          {idx + 1}. {penalty.title}
                        </p>
                        <ul className='ml-6 mt-1 space-y-1'>
                          {penalty.items.map((item, itemIdx) => (
                            <li key={itemIdx} className=' text-sm list-disc'>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className='flex justify-center gap-3 mt-12'>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                selectedCategory?.id === category.id
                  ? 'bg-yellow-400 scale-125'
                  : 'bg-gray-400 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }

        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
