import SectionWrapper from '../wrapper/SectionWrapper';
import MenuBox from '../components/ui/MenuBox';
import page1 from '../asset/img/guide/표지(1p).png';
import page2 from '../asset/img/guide/2p.png';
import page3 from '../asset/img/guide/3p.png';
import page4 from '../asset/img/guide/4p.png';
import page5 from '../asset/img/guide/5p.png';
import page6 from '../asset/img/guide/6p.png';
import page7 from '../asset/img/guide/7p.png';
import page8 from '../asset/img/guide/8p.png';
import page9 from '../asset/img/guide/9P.png';
import page10 from '../asset/img/guide/10p.png';
import page11 from '../asset/img/guide/11p.png';
import page12 from '../asset/img/guide/12P.png';
import page13 from '../asset/img/guide/13P.png';
import page14 from '../asset/img/guide/14P.png';
import page15 from '../asset/img/guide/15p.png';
import page16 from '../asset/img/guide/16P.png';
import page17 from '../asset/img/guide/17P.png';
import page18 from '../asset/img/guide/18P.png';
import page19 from '../asset/img/guide/19P.png';
import page20 from '../asset/img/guide/cover(20p).png';

export default function Guide() {
  return (
    <SectionWrapper>
      <div className='flex gap-20'>
        <MenuBox menuType='services' />
        <div className='flex-1 container mx-auto max-w-[894px] '>
          <h2 className='text-2xl font-bold text-primary-100 mb-8'>이용방법</h2>
          <div className='flex flex-col gap-8 bg-gray-50 p-8 rounded-lg'>
            <img src={page1} alt='' />
            <img src={page2} alt='' />
            <img src={page3} alt='' />
            <img src={page4} alt='' />
            <img src={page5} alt='' />
            <img src={page6} alt='' />
            <img src={page7} alt='' />
            <img src={page8} alt='' />
            <img src={page9} alt='' />
            <img src={page10} alt='' />
            <img src={page11} alt='' />
            <img src={page12} alt='' />
            <img src={page13} alt='' />
            <img src={page14} alt='' />
            <img src={page15} alt='' />
            <img src={page16} alt='' />
            <img src={page17} alt='' />
            <img src={page18} alt='' />
            <img src={page19} alt='' />
            <img src={page20} alt='' />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
