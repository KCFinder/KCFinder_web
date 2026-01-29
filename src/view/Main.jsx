import MainWrapper from '../wrapper/MainWrapper';
import BannerSection from '../components/section/main/BannerSection';
import ImgUpLoadSection from '../components/section/main/ImgUpLoadSection';
import AISection from '../components/section/main/AISection';
import MainBottomSection from '../components/section/main/MainBottomSection';
import VerifyCategorySection from '../components/section/main/VerifyCategorySection';

export default function Main() {
  return (
    <MainWrapper>
      <BannerSection />
      <ImgUpLoadSection />
      <AISection />
      <VerifyCategorySection />
      <MainBottomSection />
    </MainWrapper>
  );
}
