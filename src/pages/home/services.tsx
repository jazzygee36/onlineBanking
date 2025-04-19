import FastTransfer from '../../assets/office.jpeg';
import Deposite from '../../assets/office-talk.jpeg';
import Withdraw from '../../assets/officewalk.jpg';
// import Realiable from '../../assets/officewalk.jpg';

const CardDetails = [
  {
    title: 'Fast Transfer',
    description:
      'Transfer funds instantly—locally or internationally. Send money to mobile numbers or bank accounts with ease, low fees, and zero delays.',
    image: FastTransfer,
  },
  {
    title: 'Deposit Funds',
    description:
      'Easily add money to your online banking account with multiple deposit options tailored for your convenience. ',
    image: Deposite,
  },
  {
    title: 'Withdraw Funds',
    description: `Easily transfer your money from your online banking account to your preferred destination. Our platform ensures fast and secure.`,
    image: Withdraw,
  },
];

const HomeServices = () => {
  return (
    <div className='py-10 p-[5%] bg-[#d39b16] '>
      {/* Header */}
      <div className='flex flex-row items-center justify-center gap-2 '>
        <div className='w-6 h-[2px] bg-white'></div>
        <h4 className='text-[20px] text-white font-medium'>Our Services</h4>
      </div>
      <h1 className='text-white text-[24px] md:text-[32px] font-semibold text-center mt-1'>
        We make your life comfortable with our services.
      </h1>

      {/* Cards Grid */}
      <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-3 lg:gap-10 '>
        {CardDetails.map((card, index) => (
          <div
            key={index}
            className='w-full rounded-xl overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform duration-300 cursor-pointer'
          >
            {/* Top Image as background */}
            <div
              className='h-60 bg-cover bg-center'
              style={{ backgroundImage: `url(${card.image})` }}
            ></div>

            {/* Text at bottom */}
            <div className='p-4 text-center'>
              <h3 className='text-[#373E4A] font-semibold text-[20px] md:text-[24px]'>
                {card.title}
              </h3>
              <p className='text-gray-600 text-[16px]  mt-2'>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeServices;
