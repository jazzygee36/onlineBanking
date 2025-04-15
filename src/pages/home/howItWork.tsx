const CardDetails = [
  {
    id: 1,
    title: 'Open an Account',
    description: 'To be an account holder you have to open an account first.',
  },
  {
    id: 2,
    title: 'Verification',
    description:
      'After registration you need to verify your Email and Mobile Number.',
  },
  {
    id: 3,
    title: 'Deposit',
    description: 'Deposit some funds before applying on any FDR or DPS plans.',
  },
  {
    id: 4,
    title: 'Get Service',
    description:
      'Now you can get any of our services as our registered account-holder',
  },
];

const HowItWork = () => {
  return (
    <div className='py-12 bg-[#d39b1612]'>
      <div className='flex flex-row items-center justify-center gap-2'>
        <div className='w-6 h-[2px] bg-[#d39b16]'></div>
        <h4 className='text-[20px] text-[#d39b16] font-medium'>How it works</h4>
      </div>
      <h1 className='text-[#373E4A] text-[24px] md:text-[32px] font-semibold text-center mt-1'>
        It's easy to join with us
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6'>
        {CardDetails.map((card, index) => (
          <div key={index} className='mx-[5%]  text-center mt-10'>
            <div className='bg-[#3c1414] border-4 border-[#d39b16]  rounded-full  w-24 h-24 text-white flex items-center justify-center m-auto text-[36px] font-semibold'>
              {card.id}
            </div>
            <div className='   rounded-md  p-8  flex flex-col items-center justify-center relative overflow-hidden'>
              <h3 className='text-[#373E4A] font-semibold text-[24px] '>
                {card.title}
              </h3>
              <p className='text-gray-600 text-[16px] mt-2  font-medium'>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
