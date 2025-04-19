import AboutImg from '../../assets/about.jpg';
import EyeIcon from '../../assets/svg/eye';
import GoalIcon from '../../assets/svg/goal';
import MissionIcon from '../../assets/svg/mission';

const AboutUs = () => {
  return (
    <div className=' bg-[#d39b1612] h-full py-[40px] px-[5%] mt-[0px] '>
      <div className='flex flex-row items-center mb-8 justify-center gap-2'>
        <div className='w-6 h-[2px] bg-[#d39b16]'></div>
        <h4 className='text-center text-[20px]  text-[#d39b16] font-medium'>
          About Us
        </h4>
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-center  justify-bewteen'>
        <div className='md:hidden lg:block'>
          <img src={AboutImg} alt='about' className='rounded-lg' />
        </div>
        <div>
          <h2 className='text-center md:text-center lg:text-left text-[24px] md:text-[32px] text-[#373E4A] font-bold mb-5  '>
            We care about your money and safety.
          </h2>
          <div className='flex items-center gap-5 md:gap-8'>
            <div className=' p-1 md:p-2 rounded-lg bg-[#d39b16] flex items-center justify-center text-white'>
              <MissionIcon />
            </div>
            <div>
              <h3 className='text-[#373E4A]  font-semibold text-[18px] md:text-[22px] group-hover:text-white transition-colors duration-300'>
                Our Mission
              </h3>

              <p className='text-gray-600 text-[18px] md:text-[16px] w-full md:w-[85%] group-hover:text-white mt-2 transition-colors duration-300'>
                To provide secure, accessible, and innovative digital banking
                solutions that empower individuals and businesses to manage
                their finances with confidence and ease.
              </p>
            </div>
          </div>
          <div className='my-4 flex items-center gap-5 md:gap-8'>
            <div className=' p-1 md:p-2 rounded-lg bg-[#d39b16] flex items-center justify-center text-white'>
              <EyeIcon />
            </div>
            <div>
              <h3 className='text-[#373E4A]  font-semibold text-[18px] md:text-[22px] group-hover:text-white transition-colors duration-300'>
                Our Vision
              </h3>
              <p className='text-gray-600 text-[18px] md:text-[16px] w-full md:w-[85%] group-hover:text-white mt-2 transition-colors duration-300'>
                To become the most trusted and customer-centric online bank,
                setting the standard for financial innovation, transparency, and
                digital convenience across the globe.
              </p>
            </div>
          </div>
          <div className='flex items-center gap-5 md:gap-8'>
            <div className=' p-1 md:p-2 rounded-lg bg-[#d39b16] flex items-center justify-center text-white'>
              <GoalIcon />
            </div>
            <div>
              <h3 className='text-[#373E4A]  font-semibold text-[18px] md:text-[22px] group-hover:text-white transition-colors duration-300'>
                Our Goal
              </h3>

              <p className='text-gray-600 text-[18px] md:text-[16px] w-full md:w-[85%] group-hover:text-white mt-2 transition-colors duration-300'>
                Deliver seamless and personalized digital banking experiences.{' '}
                <br />
                Maintain top-tier security protocols to protect customer data
                and transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
