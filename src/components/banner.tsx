// components/Banner.tsx
import { useState, useEffect } from 'react';
import HomeButton from './button';
import FirstBanner from '../assets/firstbanner.jpg';

const slides = [
  {
    title: 'Welcome to the Largest E-banking System',
    desc: 'Trust Success Finance is a safe, fast, easy, and efficient e-Banking system that enables you access to your bank account and to carry out online banking services, 24/7',
    bgImg: FirstBanner,
  },
  {
    title: 'Bank Smarter, Anytime, Anywhere',
    desc: 'Manage your finances on the go with real-time updates, instant transfers, and secure access to all your banking services from the comfort of your device — 24/7, anywhere in the world.',
    bgImg: FirstBanner,
  },
  // Add more slides as needed...
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative overflow-hidden'>
      <div className='h-[70vh] md:h-[110vh]  flex transition-all duration-700'>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`w-full flex-shrink-0 flex flex-col items-center px-5 justify-center text-white transition-opacity duration-700 ${
              i === current
                ? 'opacity-100'
                : 'opacity-0 absolute top-0 left-0 w-full'
            }`}
            style={{
              backgroundImage: `url(${slide.bgImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='bg-black/60 w-full h-full absolute top-0 left-0 z-0' />
            <div className='z-0 md:z-5 flex flex-col items-center'>
              <h2 className='text-[32px] md:text-[52px] font-bold md:w-[80%]  lg:w-1/2  text-center'>
                {slide.title}
              </h2>
              <p className='mt-2  text-[18px] text-center w-full md:w-1/2 mb-10 md:mb-8'>
                {slide.desc}
              </p>
              <HomeButton
                title={'Talk to an Expert'}
                type={'submit'}
                bg='#d39b16'
                width={''}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Wavy bottom */}
      <svg
        className='absolute bottom-0 left-0 w-full '
        viewBox='0 0 1440 320'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill='#fff'
          d='M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,160C672,181,768,235,864,240C960,245,1056,203,1152,170.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
        />
      </svg>
    </div>
  );
}
