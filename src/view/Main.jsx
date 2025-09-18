import MainWrapper from '../wrapper/MainWrapper';
import BannerSection from '../components/section/main/BannerSection';
import ImgUpLoadSection from '../components/section/main/ImgUpLoadSection';
import MainBottomSection from '../components/section/main/MainBottomSection';

export default function Main() {
  return (
    <MainWrapper>
      <BannerSection />
      <ImgUpLoadSection />
      <MainBottomSection />
    </MainWrapper>
  );
}
