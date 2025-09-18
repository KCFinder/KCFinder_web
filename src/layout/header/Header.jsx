import Nav from './Nav';
import MobileMenuButton from '../../components/ui/MobileMenuButton';
import { useAuth } from '../../context/AuthContext';
import mainLogo from '../../asset/logo/mainLogo.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className='w-full border-b border-gray-300'>
      <div className='flex container mx-auto items-center'>
        <Nav isAuthenticated={isAuthenticated} />
      </div>
      <div className='md:hidden'>
        <div className='flex items-center justify-between'>
          <Link to='/'>
            <img
              src={mainLogo}
              alt='logo'
              className='w-[120px] h-[70px] md:w-[180px] md:h-[50px] mx-5 md:mx-0'
              // style={{ width: '160px', height: '90px' }}
            />
          </Link>
          <MobileMenuButton />
        </div>
      </div>
    </header>
  );
}
