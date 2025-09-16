import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import mainLogo from '../../asset/logo/mainLogo.svg';
import navContent from '../../constants/navcontent';
import DropdownMenu from './DropdownMenu';
import { useAuth } from '../../context/AuthContext';

export default function Nav({ isAuthenticated }) {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { logout, user } = useAuth();

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleNavItemClick = item => {
    navigate(item.path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <div
      className='w-full m-0 h-20 justify-center items-center text-center hidden md:flex'
      onMouseLeave={handleMouseLeave}
    >
      <nav className='grid grid-cols-4 gap-6 items-center w-full max-w-[1200px]'>
        <Link to='/'>
          <img
            src={mainLogo}
            alt='logo'
            className='w-[160px] h-[90px] md:w-[180px] md:h-[50px] mx-5 md:mx-0'
            style={{ width: '160px', height: '90px' }}
          />
        </Link>

        <div className='hidden md:grid col-span-2 col-start-2'>
          <ul className='grid grid-cols-4 gap-8 md:gap-12 lg:gap-16 p-0 list-none w-full'>
            {navContent.map(item => (
              <li
                key={item.path}
                className='cursor-pointer hover:text-primary-100 transition-colors text-center flex items-center justify-center'
                onMouseEnter={() => setActiveDropdown(item.name)}
              >
                <div
                  onClick={() => handleNavItemClick(item)}
                  className='px-3 py-2 whitespace-nowrap'
                >
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='col-span-1 col-start-4 justify-self-end'>
          <ul className='hidden md:flex items-center gap-4 whitespace-nowrap'>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className='hover:text-primary-100 transition-colors'
              >
                로그아웃
              </button>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </nav>
      <DropdownMenu
        navContent={navContent}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
    </div>
  );
}
