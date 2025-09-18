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
          className='w-full top-[70px] z-[1000] left-0 border-b border-gray-300 flex justify-center items-center flex-wrap text-center bg-white absolute shadow-lg transition-all duration-300 ease-in-out'
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className='w-full max-w-[1200px] mx-auto'>
            <div className='grid grid-cols-4 gap-6 items-center p-4 md:p-6'>
              <div></div>
              <div className='col-span-2'>
                <ul className='grid grid-cols-4 gap-8 md:gap-12 lg:gap-16'>
                  {navContent.map(item => (
                    <li key={item.name} className='flex flex-col items-center'>
                      <ul className='flex flex-col gap-2 w-full'>
                        {item.dropdownItems.map(subItem => (
                          <li
                            key={subItem.name}
                            onClick={() => navigate(subItem.path)}
                            className='text-gray-600 cursor-pointer hover:text-primary-100 whitespace-nowrap hover:font-medium transition-colors text-center px-3 py-1 rounded'
                          >
                            {subItem.name}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
