// import { useNavigate } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import ThumpsUp from '../../assets/svg/thumpsUp';

// import SuccessImg from '../../../assets/success.svg';
const CompleteRegistration = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex justify-center'>
        {' '}
        <ThumpsUp />
      </div>
      <div className='text-center'>
        <h2 className='text-[#1B1E24] text-[30px] font-[400] font-roboto my-2.5'>
          Registration Completed
        </h2>
        <p className='text-[14px] font-light text-[#252631]'>
          Your registration is now complete.
        </p>
        <p
          className='text-[14px] font-light text-[blue] text-center mt-5 cursor-pointer'
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </p>

        {/* <h4
          className='text-[#D71E0E] text-[14px] font-medium mt-[28px] cursor-pointer'
          onClick={() => navigate('/dashboard')}
        >
          GO TO DASHBOARD
        </h4> */}
      </div>
    </div>
  );
};

export default CompleteRegistration;
