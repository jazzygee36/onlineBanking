// import { useNavigate } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import ThumpsUp from '../../assets/svg/thumpsUp';

// import SuccessImg from '../../../assets/success.svg';
const Success = () => {
  //   const navigate = useNavigate();
  return (
    <div>
      <div className='flex justify-center'>
        {' '}
        <ThumpsUp />
      </div>
      <div className='text-center'>
        <h2 className='text-[#1B1E24] text-[30px] font-[400] font-roboto my-2.5'>
          Congratulations
        </h2>
        <p className='text-[14px] font-light text-[#252631]'>
          Your fund has been successfully transfered.
        </p>
        <p className='text-[14px] font-light text-[blue] mt-2'>
          Thank you for banking with us.
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

export default Success;
