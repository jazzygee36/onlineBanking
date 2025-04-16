import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChartNoAxesCombined, X } from 'lucide-react';
import Dashboard from '../../assets/svg/dashboard';

const Links = [
  { name: 'Dashboard', icon: Dashboard, path: '/dashboard' },
  { name: 'Analysis', icon: <ChartNoAxesCombined />, path: '/analysis' },
];

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const location = useLocation();
  const active = location.pathname;

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-40 lg:hidden z-10'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-[70%] md:w-[50%] lg:w-[16.8%] bg-white shadow-md border-r border-[#EAEAEA] transition-transform duration-300 ease-in-out z-20
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo & Close Button */}
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-2'>
            <img
              src='https://media.licdn.com/dms/image/v2/D4D0BAQHWyuSjzdBaJw/company-logo_200_200/company-logo_200_200/0/1725907617789/bepeerless_logo?e=2147483647&v=beta&t=tkrGCwYrLZ4xoHuQcY0kth9CbanyuDiC8rUtCRnn188'
              alt='logo'
              className='w-[40px] h-[40px]'
            />
            <h1 className='text-[#5534A5] text-lg font-semibold'>Finance</h1>
          </div>

          {/* Close button for mobile */}
          <X
            className='lg:hidden cursor-pointer'
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Navigation Links */}
        <div className='mt-6 px-4'>
          {Links.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 py-2 px-3 mb-4 text-sm font-medium cursor-pointer rounded-md 
                ${
                  active === item.path
                    ? 'text-[#A74F5D] bg-[#F1EEF6]'
                    : 'text-gray-600 hover:bg-[#F1EEF6]'
                }`}
              onClick={() => setIsOpen(false)}
            >
              {typeof item.icon === 'function' ? <item.icon /> : item.icon}
              <h2>{item.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
