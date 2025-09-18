import SignUpForm from '../components/ui/signUp/SignUpForm';
import SectionWrapper from '../wrapper/SectionWrapper';
import MenuBox from '../components/ui/MenuBox';
import ContentsWrapper from '../wrapper/ContentsWrapper';
import PageHeader from '../components/ui/PageHeader';

export default function SignUp() {
  return (
    <SectionWrapper>
      <div className='flex'>
        <MenuBox menuType='auth' />
        <ContentsWrapper className='flex tems-center justify-center'>
          <div className='max-w-[320px] w-full'>
            <PageHeader title='회원가입' />
            <SignUpForm />
          </div>
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
