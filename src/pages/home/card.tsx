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
      'We have online payment services like PayPal, Stripe, Paystack, Skrill, Flutterwave, Mollie, Payeer, RazorPay, etc.',
    icon: BadgeDollarSign,
  },
  {
    title: 'Take Loan',
    description:
      'We have several plans to apply for a loan. You may apply to our loan plans by submitting some of your valid information.',
    icon: Blend,
  },
  {
    title: 'Deposit Schemes',
    description:
      'We have two deposit schemes for you, one is Deposit Pension Scheme and another one is the Fixed Deposit Receipt.',
    icon: BanknoteArrowUp,
  },
  {
    title: 'Transfer Money',
    description:
      'You are able to transfer your funds within the Trust Ensure Finance or other banks we support by adding your beneficiaries.',
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
            <h3 className='text-[#373E4A] font-semibold text-[24px] group-hover:text-white transition-colors duration-300'>
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
