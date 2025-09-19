import LoginForm from '../components/ui/login/LoginForm';
import SnsLoginButton from '../components/ui/login/SnsLoginButton';
import SectionWrapper from '../wrapper/SectionWrapper';
import MenuBox from '../components/ui/MenuBox';
import PageHeader from '../components/ui/PageHeader';
import ContentsWrapper from '../wrapper/ContentsWrapper';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <SectionWrapper>
      <div className='flex'>
        <MenuBox menuType='auth' />
        <ContentsWrapper className='flex items-center justify-center'>
          <div className='max-w-[320px] w-full'>
            <PageHeader title='로그인' />
            <LoginForm />
            {/* <SnsLoginButton /> */}
            <button
              onClick={handleSignUp}
              className='w-full py-3 text-white bg-primary-100 rounded-md  mt-5'
            >
              회원가입
            </button>
          </div>
        </ContentsWrapper>
      </div>
    </SectionWrapper>
  );
}
