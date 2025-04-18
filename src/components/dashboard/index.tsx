import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';
import ChatBox from '../chatbox';
import { dashboardProps } from '../../utils/interface';

// You may want to export this from one place if reused
const Links = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Account details', path: '/my-account' },
  { name: 'Fund transfer', path: '/transfer' },
  { name: 'View statement', path: '/statement' },
  { name: 'Profile settings', path: '/profile' },
  { name: 'Bill payments', path: '/pay-bills' },
  { name: 'Contact us', path: '/' },
];

const MainDashboard = ({ children }: dashboardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const activePath = location.pathname;

  const currentLink = Links.find((link) => link.path === activePath);
  const title = currentLink?.name || 'Dashboard';

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className='flex flex-col flex-1'>
        <Header title={title} setIsOpen={setIsOpen} />
        <div className='p-4 bg-[#F8FAFB] h-full'>{children}</div>
        <ChatBox />
      </div>
    </div>
  );
};

export default MainDashboard;
