import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import navContent from '../../constants/navcontent';

export default function MobileMenu({ menuType, isOpen, onClose }) {
  const [expandedMenu, setExpandedMenu] = useState(null);

  console.log('MobileMenu 렌더링:', { menuType, isOpen });

  if (!isOpen) {
    console.log('MobileMenu 렌더링 안됨 - isOpen이 false');
    return null;
  }

  const handleMenuClick = menuName => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const handleSubMenuClick = () => {
    onClose();
  };

  return (
    <div
      className='fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='absolute top-0 right-0 w-80 h-full bg-white shadow-2xl'
        onClick={e => e.stopPropagation()}
      >
        {/* 메뉴 헤더 */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200 '>
          <h2 className='text-lg font-semibold text-gray-800'>메뉴</h2>
          <button
            onClick={onClose}
            className='p-2  rounded-full transition-colors'
          >
            <svg
              className='w-6 h-6 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* 모든 메뉴 표시 */}
        <div className='space-y-0'>
          {navContent.map(menu => (
            <div key={menu.name}>
              <button
                onClick={() => handleMenuClick(menu.name)}
                className={cn(
                  'w-full flex items-center justify-between p-4 text-left border-b border-gray-200 transition-colors',
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
                      className='block px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors border-b border-gray-200'
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
