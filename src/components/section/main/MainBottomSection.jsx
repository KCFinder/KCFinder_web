import SectionWrapper from '../../../wrapper/SectionWrapper';
import MainNotice from '../../ui/main/MainNotice';
import MainContact from '../../ui/main/MainContact';

export default function MainBottomSection() {
  return (
    <SectionWrapper className='py-12'>
      <div className='flex gap-5 items-center flex-col md:flex-row md:justify-center'>
        <MainNotice />
        <MainContact />
      </div>
    </SectionWrapper>
  );
}
