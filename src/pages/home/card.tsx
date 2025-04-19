import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  BadgeDollarSign,
  BanknoteArrowUp,
  Rotate3d,
  Blend,
} from 'lucide-react';
import { useEffect } from 'react';

const CardDetails = [
  {
    title: 'Online Payment',
    description:
      'Make fast, secure payments anytime, anywhere with trusted gateways like PayPal, Stripe, Paystack, and more.',
    icon: BadgeDollarSign,
  },
  {
    title: 'Take Loan',
    description:
      'Get quick and easy access to personal or business loans with flexible repayment plans and low interest rates.',
    icon: Blend,
  },
  {
    title: 'Deposit Schemes',
    description:
      'Grow your savings with our flexible and rewarding deposit schemes. Choose from a variety of plans.',
    icon: BanknoteArrowUp,
  },
  {
    title: 'Transfer Money',
    description:
      'Send money instantly and securely—anytime, anywhere. Whether it’s to family, friends, or business partners.',
    icon: Rotate3d,
  },
];

const Card = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <div className='relative -top-10 px-[5%] bg-white w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center mt-8'>
      {CardDetails.map((card, index) => (
        <div
          key={index}
          data-aos='flip-right'
          className='group bg-white hover:bg-[#d39b16] rounded-md shadow-md hover:shadow-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] flex flex-col items-center justify-center relative overflow-hidden'
        >
          <div className='relative z-10'>
            <card.icon className='w-16 h-16 mb-4 text-[#d39b16] group-hover:text-white transition-transform duration-300 group-hover:rotate-12' />
            <h3 className='text-[#373E4A] font-semibold text-[20px] md:text-[24px] group-hover:text-white transition-colors duration-300'>
              {card.title}
            </h3>
            <p className='text-gray-600 text-[16px] group-hover:text-white mt-2 transition-colors duration-300'>
              {card.description}
            </p>
          </div>

          {/* Optional Glow/Light Effect */}
          <div className='absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none' />
        </div>
      ))}
    </div>
  );
};

export default Card;
