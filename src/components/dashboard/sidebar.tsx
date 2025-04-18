import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Dashboard from '../../assets/svg/dashboard';
import MyAccount from '../../assets/svg/myAccount';
import Transfer from '../../assets/svg/transfer';
import Statement from '../../assets/svg/statement';
import Profile from '../../assets/svg/profile';
import PayBills from '../../assets/svg/bills';
import Mail from '../../assets/svg/mail';
import Logo from '../../assets/logo.jpg';

const Links = [
  { name: 'Dashboard', icon: Dashboard, path: '/dashboard' },
  { name: 'Account details', icon: MyAccount, path: '/my-account' },
  {
    name: 'Fund transfer',
    icon: Transfer,
    path: '/transfer',
  },
  { name: 'View statement', icon: Statement, path: '/statement' },
  {
    name: 'Profile settings',
    icon: Profile,
    path: '/profile',
  },
  {
    name: 'Bill payments',
    icon: PayBills,
    path: '/pay-bills',
  },
  { name: 'Contact us', icon: Mail, path: '/' },
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
  const navigate = useNavigate();

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
        className={`fixed lg:static top-0 left-0 h-full w-[70%] md:w-[50%] lg:w-[16.8%] bg-white border-r border-[#EAEAEA] transition-transform duration-300 ease-in-out z-20
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo & Close Button */}
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center '>
            <img src={Logo} alt='logo' className='' width={25} />
            <h1 className='text-md font-semibold bg-gradient-to-r from-[#d39b16] to-[#A74F5D] bg-clip-text text-transparent'>
              -Finance
            </h1>
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
          ? 'text-[#d39b16] bg-[#F1EEF6]'
          : 'text-gray-600 hover:bg-[#F1EEF6]'
      }`}
              onClick={() => {
                if (item.name === 'Contact us') {
                  window.location.href = 'mailto:info@yourcompany.com'; // Replace with your actual email
                } else {
                  navigate(item.path);
                }
                setIsOpen(false);
              }}
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
