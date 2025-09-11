import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DropdownMenu({
  navContent,
  activeDropdown,
  setActiveDropdown,
}) {
  const navigate = useNavigate();

  return (
    <>
      {activeDropdown && (
        <div
          className='absolute top-full left-0 w-full z-[9999]'
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className='bg-white shadow-lg border-b border-gray-200 rounded-lg p-4 mt-2'>
            <div className='container mx-auto pl-10'>
              <ul className='flex gap-10 justify-center'>
                {navContent.map(item => (
                  <li key={item.name} className='flex flex-col w-20'>
                    <ul className='flex flex-col gap-4'>
                      {item.dropdownItems.map(subItem => (
                        <li
                          key={subItem.name}
                          onClick={() => navigate(subItem.path)}
                          className='text-gray-600 cursor-pointer hover:text-primary-100 hover:font-medium transition-colors text-center'
                        >
                          {subItem.name}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
