import React from 'react';
import { Link } from 'react-router-dom';
import navContent from '../../constants/navcontent';
import authContent from '../../constants/authContent';

export default function MenuBox({ menuType }) {
  const getMenuData = type => {
    switch (type) {
      case 'auth':
        return authContent;
      case 'services':
        return navContent.find(item => item.path === '/services');
      case 'notice':
        return navContent.find(item => item.path === '/notice');
      case 'my/finder':
        return navContent.find(item => item.path === '/my/finder');
      case 'introduction':
        return navContent.find(item => item.path === '/introduction');
      default:
        return navContent[0];
    }
  };

  const currentMenu = getMenuData(menuType);

  if (!currentMenu) return null;

  return (
    <div className='w-fit h-fit hidden md:block'>
      <div className='bg-white border border-gray-500'>
        <Link
          to={currentMenu.path}
          className='block px-4 py-4 bg-primary-200 text-center text-white font-semibold transition-colors text-xl'
        >
          {currentMenu.name}
        </Link>

        {currentMenu.dropdownItems.map(subItem => (
          <Link
            key={subItem.name}
            to={subItem.path}
            className='block px-6 py-2 text-center hover:font-bold transition-colors border border-gray-300'
          >
            {subItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
