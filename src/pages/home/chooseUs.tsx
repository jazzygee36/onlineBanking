import { useEffect, useRef } from 'react';
import Security from '../../assets/svg/security';
import Cash from '../../assets/svg/cash';
import Fast from '../../assets/svg/fast';
import Globe from '../../assets/svg/globe';
import Support from '../../assets/svg/support';

const CardDetails = [
  {
    title: 'Secure Service',
    description:
      'We ensure top-notch security with end-to-end encryption and multi-layered authentication to protect your transactions.',
    icon: <Security />,
  },
  {
    title: 'Lowest Transaction Fee',
    description:
      'Enjoy the most competitive rates in the market — no hidden charges or surprise fees.',
    icon: <Cash />,
  },
  {
    title: 'Fast Processing',
    description:
      'Our system is optimized for lightning-fast transactions, reducing waiting times significantly.',
    icon: <Fast />,
  },
  {
    title: 'Global Accessibility',
    description:
      'Send and receive money from anywhere in the world, 24/7, with multi-currency support.',
    icon: <Globe />,
  },
  {
    title: ' 24/7 Customer Support',
    description:
      'Got questions? Our dedicated support team is always here to help — anytime, any day.',
    icon: <Support />,
  },
];

const ChooseUs = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = 1; // pixels per frame
    let animationFrame: number;

    const scroll = () => {
      if (!slider) return;

      slider.scrollLeft += scrollAmount;

      // Reset to beginning when reaching the end
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className='py-12 bg-[#3c1414] '>
      {/* Header */}
      <div className='flex flex-row items-center justify-center gap-2'>
        <div className='w-6 h-[2px] bg-[#d39b16]'></div>
        <h4 className='text-[20px] text-[#d39b16] font-medium'>
          Why Choose Us?
        </h4>
      </div>
      <div className='mx-[5%]'>
        <h1 className='text-white text-[20px] md:text-[32px] font-semibold text-center mt-1 '>
          We are giving you the best services
        </h1>
      </div>

      {/* Auto-scrolling Slider */}
      <div
        ref={sliderRef}
        className='mt-12 overflow-x-auto  scrollbar-hide px-[5%]'
      >
        <div className='flex gap-6 w-max'>
          {CardDetails.map((card, index) => {
            return (
              <div
                key={index}
                className='group flex-shrink-0 w-[280px] md:w-[300px] bg-white hover:bg-[#d39b16] rounded-md shadow-md hover:shadow-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] flex flex-col items-center justify-center relative overflow-hidden'
              >
                {/* <div className='relative z-10'> */}
                {card.icon}
                <h3 className='text-[#373E4A] text-center font-semibold text-[24px] group-hover:text-white transition-colors duration-300'>
                  {card.title}
                </h3>
                <p className='text-gray-600 text-[16px] group-hover:text-white mt-2 transition-colors duration-300'>
                  {card.description}
                </p>
                {/* </div> */}
                <div className='absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none' />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
