import AboutImg from '../../assets/about.jpg';
import EyeIcon from '../../assets/svg/eye';
import GoalIcon from '../../assets/svg/goal';
import MissionIcon from '../../assets/svg/mission';

const AboutUs = () => {
  return (
    <div className=' bg-[#d39b1612] h-full py-[40px] px-[5%] mt-[30px] md:mt-[80px] '>
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
            <div className='p-2 rounded-lg bg-[#d39b16] flex items-center justify-center text-white'>
              <MissionIcon />
            </div>
            <div>
              <h3 className='text-[#373E4A]  font-semibold text-[20px] md:text-[24px] group-hover:text-white transition-colors duration-300'>
                Our Mission
              </h3>

              <p className='text-gray-600 text-[16px] md:text-[18px] w-full md:w-[80%] group-hover:text-white mt-2 transition-colors duration-300'>
                We are focused on building and sustaining long-term generational
                relationships with our customers.
              </p>
            </div>
          </div>
          <div className='my-4 flex items-center gap-5 md:gap-8'>
            <div className='h-16 w-24 rounded-lg bg-[#d39b16] flex items-center justify-center text-white'>
              <EyeIcon />
            </div>
            <div>
              <h3 className='text-[#373E4A]  font-semibold text-[20px] md:text-[24px] group-hover:text-white transition-colors duration-300'>
                Our Vision
              </h3>
              <p className='text-gray-600 text-[16px] md:text-[18px] w-full md:w-[80%] group-hover:text-white mt-2 transition-colors duration-300'>
                Trust Ensure Finance will serve all over the world and becomes
                the most popular Bank in this universe.
              </p>
            </div>
          </div>
          <div className='flex items-center gap-5 md:gap-8'>
            <div className='p-2 rounded-lg bg-[#d39b16] flex items-center justify-center text-white'>
              <GoalIcon />
            </div>
            <div>
              <h3 className='text-[#373E4A]  font-semibold text-[20px] md:text-[24px] group-hover:text-white transition-colors duration-300'>
                Our Goal
              </h3>

              <p className='text-gray-600 text-[16px] md:text-[18px] w-full md:w-[90%] group-hover:text-white mt-2 transition-colors duration-300'>
                Trust Ensure Finance will serve their customers from all over
                the world and becomes the popular bank in this universe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
