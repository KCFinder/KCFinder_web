import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import navContent from '../../constants/navcontent';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import X from '../../asset/icon/X';

export default function MobileMenu({ isOpen, onClose }) {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleMenuClick = menuName => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const handleSubMenuClick = () => {
    onClose();
  };

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  return (
    <div
      className='fixed inset-0 z-[9999] w-full bg-black/50'
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className='absolute top-4 left-10 z-[10000] rounded-full transition-colors bg-white hover:bg-white p-2 shadow-lg'
      >
        <X />
      </button>

      <div
        className='absolute top-0 right-0 w-80 h-screen bg-white shadow-2xl'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-primary-100'>
          {isAuthenticated ? (
            <>
              <h2 className='text-lg font-semibold text-white'>
                회원님 안녕하세요!
              </h2>
              <button
                className='text-sm text-white underline'
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <h2 className='text-lg font-semibold text-white '>
                로그인이 필요합니다
              </h2>
              <button
                className='text-sm text-white underline'
                onClick={handleLogin}
              >
                로그인
              </button>
            </>
          )}
        </div>

        {/* 모든 메뉴 표시 */}
        <div>
          {navContent.map(menu => (
            <div key={menu.name}>
              <button
                onClick={() => handleMenuClick(menu.name)}
                className={cn(
                  'w-full flex items-center justify-between p-4 text-left border-b border-gray-200 transition-colors bg-white',
                  expandedMenu === menu.name && 'text-primary-100',
                )}
              >
                <span className='font-medium text-gray-800'>{menu.name}</span>
                <svg
                  className={cn(
                    'w-5 h-5 text-gray-500 transition-transform',
                    expandedMenu === menu.name && 'rotate-180',
                  )}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>

              {/* 서브 메뉴 */}
              {expandedMenu === menu.name && (
                <div className=''>
                  {menu.dropdownItems.map(subItem => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      onClick={handleSubMenuClick}
                      className='block px-6 py-3 text-gray-600  hover:bg-gray-100 hover:text-gray-800 transition-colors border-b border-gray-200'
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
