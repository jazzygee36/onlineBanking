import { useState } from 'react';

const faqData = [
  {
    question: 'How do I apply for a loan?',
    answer:
      'You can apply for a loan by selecting a loan plan that suits your needs and clicking on the "Apply Now" button. Fill out the required form, and our team will reach out to you shortly.',
  },
  {
    question: 'What documents are required?',
    answer:
      'You’ll typically need to provide a valid ID, proof of income, and a utility bill or other proof of address. Requirements may vary depending on the loan plan.',
  },
  {
    question: 'How long does it take to get approved?',
    answer:
      'Loan approvals can take anywhere from a few hours to 1-2 business days depending on the completeness of your application and the type of loan.',
  },
  {
    question: 'Can I repay the loan early?',
    answer:
      'Yes, early repayments are allowed. In fact, we encourage it! Please review your loan terms for any applicable early repayment fees.',
  },
];

const HomeFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className='py-12 bg-yellow-100'>
      {/* Header */}
      <div className='mx-[5%]'>
        <h1 className='text-[#373E4A] text-[24px] md:text-[32px] font-semibold text-center mt-1'>
          Frequently Asked Questions
        </h1>
        <div className='text-center w-[90%] md:w-[60%] mx-auto mt-2'>
          <h4 className='text-[14px] text-[#d39b16] font-medium'>
            Though we have provided lots of information about us and how we
            serve, what is our working process, our terms and conditions, our
            policies, etc.
          </h4>
        </div>

        {/* FAQ Items */}
        <div className='mt-10 max-w-3xl mx-auto'>
          {faqData.map((faq, index) => (
            <div
              key={index}
              className='mb-4 bg-white rounded-lg shadow-md overflow-hidden'
            >
              <button
                onClick={() => toggle(index)}
                className='w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center text-[#373E4A] font-semibold text-[16px]'
              >
                {faq.question}
                <span className='text-[#d39b16] text-xl'>
                  {activeIndex === index ? '-' : '+'}
                </span>
              </button>
              {activeIndex === index && (
                <div className='px-6 pb-4 text-sm text-gray-600'>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeFAQ;
