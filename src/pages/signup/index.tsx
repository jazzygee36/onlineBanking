import { useState } from 'react';

import ErrorMessage from '../../components/errorMessage';
import ProgressBar from '../../components/progressBar';
import CompleteRegistration from './completeRegistration';
import IndividualForm from './individual.form';
// import CorporateForm from './corporate.form';

const SignUp = () => {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1');
  const [completeRegistration, setCompleteRegistration] = useState(false);
  const [formHeader, setFormHeader] = useState(false);
  const [progress, setProgress] = useState(1);
  const [step, setStep] = useState(1);
  const [apiError, setApiError] = useState<string | null>(null);

  const nextStep = () => {
    setStep((prev) => prev + 1);
    setProgress(step + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    setProgress(step - 1);
  };

  const headerTitle = formHeader ? 'Account details' : 'Register new account';

  const tabButtonClass = (tab: 'tab1' | 'tab2') =>
    `flex-1 py-2 text-center text-[12px] font-roboto font-normal h-[52px] rounded-[2px] ${
      activeTab === tab
        ? 'border bg-[#3c1414] text-white rounded-[2px]'
        : 'border border-[#E8ECEF] bg-transparent rounded-[2px]'
    }`;

  return (
    <div className=' w-full flex flex-col items-center justify-center bg-yellow-50 '>
      <div className='z-100 w-full'>
        <img
          src={`https://www.trustensurefinance.com/InternetBanking/img/logo2.png`}
          alt='logo'
          className='w-full'
        />
      </div>

      {apiError && (
        <ErrorMessage
          title={apiError}
          onClose={() => {
            setApiError(null);
          }}
        />
      )}
      <div className='w-[95%] md:w-[555px] bg-white p-3 md:p-12 rounded-md text-[#1E1E1E]'>
        {!completeRegistration ? (
          <>
            <div className='text-center mb-12'>
              <h1 className='font-roboto text-[24px] md:text-[30px] font-normal'>
                {headerTitle}
              </h1>
              <p className='text-[14px] font-roboto'>
                Please register an account with us to take the benefits of our
                facilities.
              </p>
            </div>
            <div>
              {/* {step === 1 && (
                <p className='text-[14px] font-roboto text-[#1E1E1E]'>
                  Select the category that best describes you
                </p>
              )} */}
              <div className='w-full mt-3.5'>
                {/* Tab Buttons */}
                {step === 1 && (
                  <div className='flex w-[100%] gap-2.5 '>
                    <button
                      className={tabButtonClass('tab1')}
                      onClick={() => {
                        setActiveTab('tab1'), setStep(1), setProgress(1);
                      }}
                    >
                      Personal Information
                    </button>
                    {/* <button
                      className={tabButtonClass('tab2')}
                      onClick={() => {
                        setActiveTab('tab2'), setStep(1), setProgress(1);
                      }}
                    >
                      Corporate
                    </button> */}
                  </div>
                )}
                {/* Tab Content */}
                <div className='mt-5'>
                  {activeTab === 'tab1' && (
                    <IndividualForm
                      setFormHeader={setFormHeader}
                      completeRegistration={completeRegistration}
                      setCompleteRegistration={setCompleteRegistration}
                      setProgress={setProgress}
                      step={step}
                      setStep={setStep}
                      nextStep={nextStep}
                      prevStep={prevStep}
                      setApiError={setApiError}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <CompleteRegistration />
        )}
      </div>
      <div className='mt-10 mb-[63px]  '>
        <p className='text-center text-[16px] font-[400]'>{progress} / 4</p>
        <ProgressBar step={step} />
        {/* <ChatBoxContainer /> */}
      </div>
    </div>
  );
};

export default SignUp;
