import { useState } from 'react';
import Sidebar from './sidebar';

import { dashboardProps } from '../../utils/interface';
import Header from './header';

const MainDashboard = ({ children }: dashboardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className='flex flex-col flex-1'>
        <Header title='Dashboard' setIsOpen={setIsOpen} />
        <div className='p-4 '>{children}</div>
      </div>
    </div>
  );
};

export default MainDashboard;
