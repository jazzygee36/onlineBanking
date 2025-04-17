import { useState } from 'react';
import Sidebar from './sidebar';

import { dashboardProps } from '../../utils/interface';
import Header from './header';
import ChatBox from '../chatbox';

const MainDashboard = ({ children }: dashboardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className='flex flex-col flex-1'>
        <Header title='Dashboard' setIsOpen={setIsOpen} />
        <div className='p-4 bg-[#F8FAFB] h-full'>{children}</div>
        <ChatBox />
      </div>
    </div>
  );
};

export default MainDashboard;
