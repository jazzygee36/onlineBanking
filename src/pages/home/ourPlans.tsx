import { useEffect } from 'react';
import PlanIcon from '../../assets/svg/plan';
import HomeButton from '../../components/button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Plans = [
  {
    id: 1,
    title: 'Personal Loan',
    description:
      'Get a personal loan with flexible repayment options and competitive interest rates.',
    interestRate: '25%',
    minimum: '$10,000.00',
    maximum: '$100,000.00',
    Installment: '25%',
    interval: 'In 30 Days',
    total: '4',
    icon: PlanIcon,
  },
  {
    id: 2,
    title: 'Business Loan',
    description:
      'Secure your business with our affordable business loan plans.',
    interestRate: '10%',
    minimum: '$100,000.00',
    maximum: '$10,000,000.00',
    Installment: '10%',
    interval: 'In 30 Days',
    total: '12',
    icon: PlanIcon,
  },
  {
    id: 3,
    title: 'Car Loan',
    description:
      'Drive your dream car with our easy car loan options and quick approvals.',
    interestRate: '30%',
    minimum: '$100,000.00',
    maximum: '$10,000,000.00',
    Installment: '10%',
    interval: 'In 30 Days',
    total: '12',
    icon: PlanIcon,
  },
];

const OurPlans = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <div className='py-12'>
      {/* Header */}
      <div className='flex flex-row items-center justify-center gap-2'>
        <div className='w-6 h-[2px] bg-[#d39b16]'></div>
        <h4 className='text-[20px] text-[#d39b16] font-medium'>
          Our Loan Plans
        </h4>
      </div>

      <div className='mx-[5%]'>
        <h1 className='text-[#373E4A] text-[32px] font-semibold text-center mt-1'>
          We Have The Best Loan Plans.
        </h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mx-[5%] mt-12'>
        {Plans.map((card, index) => {
          const isMiddleCard = index === 1;

          return (
            <div
              data-aos='flip-left'
              data-aos-easing='ease-out-cubic'
              data-aos-duration='2000'
              key={index}
              className={`group rounded-xl shadow-lg p-8 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] flex flex-col items-center justify-center relative overflow-hidden ${
                isMiddleCard ? 'bg-yellow-100' : 'bg-white hover:bg-[#d39b16]'
              }`}
            >
              <div className='relative z-10 w-full'>
                <PlanIcon
                  className={`w-16 h-16 mx-auto ${
                    isMiddleCard
                      ? 'text-[#d39b16]'
                      : 'text-[#d39b16] group-hover:bg-white group-hover:rotate-12 transition-transform duration-300'
                  }`}
                />
                <h3
                  className={`font-bold mt-6 text-[20px] text-center ${
                    isMiddleCard
                      ? 'text-[#373E4A]'
                      : 'text-[#d39b16] group-hover:text-white transition-colors duration-300'
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-[14px] mt-2 text-center ${
                    isMiddleCard
                      ? 'text-gray-700'
                      : 'text-gray-600 group-hover:text-white transition-colors duration-300'
                  }`}
                >
                  {card.description}
                </p>
                <h1
                  className={`text-[35px] font-semibold mt-8 text-center ${
                    isMiddleCard ? 'text-[#373E4A]' : 'group-hover:text-white'
                  }`}
                >
                  {card.interestRate}{' '}
                  <span className='text-[15px] font-normal'>/ per month</span>
                </h1>

                <div className='my-6'>
                  <HomeButton
                    title={'Apply Now'}
                    type={'submit'}
                    bg={isMiddleCard ? '#373E4A' : '#d39b16'}
                    width={'100%'}
                  />
                </div>

                <div className='w-full h-[1px] bg-amber-100'></div>

                <div
                  className={`mt-6 flex items-center justify-between ${
                    isMiddleCard ? 'text-gray-800' : 'group-hover:text-white'
                  }`}
                >
                  <span>Take Minimum</span>
                  <span>{card.minimum}</span>
                </div>
                <div
                  className={`my-4 flex items-center justify-between ${
                    isMiddleCard ? 'text-gray-800' : 'group-hover:text-white'
                  }`}
                >
                  <span>Take Maximum</span>
                  <span>{card.maximum}</span>
                </div>
                <div
                  className={`flex items-center justify-between ${
                    isMiddleCard ? 'text-gray-800' : 'group-hover:text-white'
                  }`}
                >
                  <span>Per Installment</span>
                  <span>{card.Installment}</span>
                </div>
                <div
                  className={`my-4 flex items-center justify-between ${
                    isMiddleCard ? 'text-gray-800' : 'group-hover:text-white'
                  }`}
                >
                  <span>Installment Interval</span>
                  <span>{card.interval}</span>
                </div>
                <div
                  className={`flex items-center justify-between ${
                    isMiddleCard ? 'text-gray-800' : 'group-hover:text-white'
                  }`}
                >
                  <span>Total Installment</span>
                  <span>{card.total}</span>
                </div>
              </div>

              {/* Optional Glow for non-middle cards */}
              {!isMiddleCard && (
                <div className='absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none' />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurPlans;
