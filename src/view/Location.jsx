import SectionWrapper from '../wrapper/SectionWrapper';
import location from '../asset/img/location2.png';
import Map from '../asset/icon/map';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';

export default function Location() {
  return (
    <SectionWrapper>
      <div className='flex items-start gap-20'>
        <MenuBox menuType='introduction' />
        <ContentsWrapper>
          <PageHeader title='오시는 길' />
          <img
            src={location}
            alt='location'
            className='w-[894px] h-[321px] object-cover'
          />
          <div className='shadow-lg p-5 flex items-center gap-10 mt-10'>
            <Map />
            <p className='text-sm md:text-gray-500 text-center'>
              부산광역시 부산진구 동천로 116
            </p>
          </div>
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
