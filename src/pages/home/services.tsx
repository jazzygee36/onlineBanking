import FastTransfer from '../../assets/office.jpeg';
import Deposite from '../../assets/office-talk.jpeg';
import Withdraw from '../../assets/officewalk.jpg';
// import Realiable from '../../assets/officewalk.jpg';

const CardDetails = [
  {
    title: 'Fast Transfer',
    description:
      'Our Money transfer system is secure and easy. Send your funds to your beneficiaries within Trust Ensure Finance or to other banks. Transfer within Trust Ensure Finance is instant and to other banks may take 24 hours.',
    image: FastTransfer,
  },
  {
    title: 'Deposit Funds',
    description:
      'Account-holders of Trust Ensure Finance are able to deposit their money through our several payment systems. We have online payment services like PayPal, Stripe, Paystack, Skrill, Flutterwave, Mollie, Payeer, etc.',
    image: Deposite,
  },
  {
    title: 'Withdraw Funds',
    description: `Account-holders of Trust Ensure Finance are able to withdraw money from their account. Without verification, any withdrawal won't be completed, so you can trust Trust Ensure Finance.`,
    image: Withdraw,
  },
];

const HomeServices = () => {
  return (
    <div className='py-10 p-[5%] bg-[#d39b16] '>
      {/* Header */}
      <div className='flex flex-row items-center justify-center gap-2 '>
        <div className='w-6 h-[2px] bg-[#3c1414]'></div>
        <h4 className='text-[20px] text-[#3c1414] font-medium'>Our Services</h4>
      </div>
      <h1 className='text-white text-[27px] md:text-[32px] font-semibold text-center mt-1'>
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
              <h3 className='text-[#373E4A] font-semibold text-[24px]'>
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
