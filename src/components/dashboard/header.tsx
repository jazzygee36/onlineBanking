import { Menu } from 'lucide-react';
import Bell from '../../assets/svg/bell';

const Header = ({
  title,
  setIsOpen,
}: {
  title: string;
  setIsOpen: (val: boolean) => void;
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className='border-b border-[#DEE6E2] w-full px-5 py-3 flex items-center justify-between bg-white'>
      {/* Hamburger Menu (Mobile) */}
      <div className='lg:hidden'>
        <Menu onClick={() => setIsOpen(true)} className='cursor-pointer' />
      </div>

      <h3 className='text-[16px] text-[#A74F5D] font-medium hidden md:block'>
        {title}
      </h3>

      {/* Date & Notification */}
      <div className='flex items-center gap-4'>
        <h3 className='text-sm'>{currentDate}</h3>
        <div className='rounded-full bg-[#F1EEF6] p-2'>
          <Bell />
        </div>
      </div>
    </div>
  );
};

export default Header;
