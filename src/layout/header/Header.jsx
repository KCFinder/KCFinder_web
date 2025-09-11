import mainLogo from '../../asset/logo/mainLogo.svg';
import Nav from './Nav';
import MobileMenuButton from '../../components/ui/MobileMenuButton';

export default function Header() {
  return (
    <header className='w-full border-b border-gray-300'>
      <div className='container mx-auto max-w-[1200px]'>
        <Nav />
        <div className='md:hidden absolute top-4 right-4'>
          <MobileMenuButton />
        </div>
      </div>
    </header>
  );
}
