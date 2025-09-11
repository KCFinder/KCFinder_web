import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import mainLogo from '../../asset/logo/mainLogo.svg';
import navContent from '../../constants/navcontent';
import DropdownMenu from './DropdownMenu';

export default function Nav() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  //   const {  logout, user } = useAuth();

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleNavItemClick = item => {
    navigate(item.path);
  };

  //   const handleLogout = () => {
  //     logout(); // AuthContext의 로그아웃 함수 호출
  //     navigate('/auth/login'); // 로그아웃 후 로그인 페이지로 이동
  //   };

  return (
    <div className='relative' onMouseLeave={handleMouseLeave}>
      <nav className='flex items-center justify-between container mx-auto px-4 md:px-0 py-4'>
        <Link to='/main'>
          <img
            src={mainLogo}
            alt='logo'
            className='md:w-[180px] md:h-[50px] w-[120px] h-[30px]'
          />
        </Link>

        <div className='hidden md:block'>
          <ul className='flex items-center gap-10 justify-center'>
            {navContent.map(item => (
              <li
                key={item.path}
                className='cursor-pointer hover:text-primary-100 transition-colors w-20 text-center'
                onMouseEnter={() => setActiveDropdown(item.name)}
              >
                <div onClick={() => handleNavItemClick(item)}>{item.name}</div>
              </li>
            ))}
          </ul>
        </div>

        <ul className='hidden md:flex items-center gap-4'>
          <Link
            to='/login'
            className='hover:text-primary-100 transition-colors'
          >
            로그인
          </Link>
          <Link
            to='/sign-up'
            className='hover:text-primary-100 transition-colors'
          >
            회원가입
          </Link>
        </ul>
      </nav>

      <DropdownMenu
        navContent={navContent}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
    </div>
  );
}
