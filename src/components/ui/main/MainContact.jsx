import building from '../../../asset/img/building.jpg';
import Phone from '../../../asset/icon/Phone';
import Email from '../../../asset/icon/Email';

export default function MainContact() {
  return (
    <div
      data-aos='fade-up'
      data-aos-delay='200'
      className='flex flex-col gap-4 w-full max-w-[612px] h-[218px] shadow-md p-4 rounded-xl'
    >
      <p className='text-2xl font-bold text-left w-full'>문의하기</p>
      <div className='flex items-center gap-6'>
        <img
          src={building}
          alt='contact'
          className='md:w-[258px] md:h-[113px] hidden md:block rounded-2xl object-cover'
        />
        <ul className='flex flex-col gap-2'>
          <li className='flex items-center gap-4'>
            <Email />
            <p className='truncate'>yeonho4698@gmail.com</p>
          </li>
          <li className='flex items-center gap-4'>
            <Phone />
            <p className='truncate'>070-7762-4698</p>
          </li>
          <li className='flex items-center gap-4'>
            <Phone />
            <p>010-3300-4698</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
