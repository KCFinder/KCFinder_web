import Hambuger from '../../asset/icon/Hambuger';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import MobileMenu from './mobileMenu';

export default function MobileMenuButton({ className, menuType = 'main' }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className={cn('md:hidden px-5', className)} onClick={handleOpen}>
        <Hambuger />
      </button>

      <MobileMenu menuType={menuType} isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
