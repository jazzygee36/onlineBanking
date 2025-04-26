import { useEffect, useState } from 'react';
import MainDashboard from '../../components/dashboard';
import SelectInput from '../../components/selectInput';
import HomeButton from '../../components/button';
import { countries } from '../../utils/countries';
import { z } from 'zod';
import { transferSchema } from '../../utils/validation';
import HomeInput from '../../components/input';

type FormData = z.infer<typeof transferSchema>;

const Transfer = () => {
  const [fundType, setFundType] = useState('');
  const [tanCode, setTanCode] = useState(true);
  const [errors] = useState<{ [key: string]: string }>({});
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    if (step === 4) {
      setLoading(true); // reset to true when step 4 starts
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [step]);
  const [formData, setFormData] = useState<FormData>({
    country: '',
    amount: '',
    name: '',
    acctNumber: '',
    bankName: '',
    bankBranch: '',
    onlinePin: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <MainDashboard title={'Transfer'}>
      <h1 className='font-medium mt-6 md:hidden block'>Funds Transfer</h1>

      <div className='w-full bg-gray-200 p-4 my-4 flex items-center justify-between '>
        <div className='flex gap-4'>
          <h1 className='font-medium'> Account Number: </h1>
          <h1> {user.acctNumber}</h1>
        </div>
      </div>

      {step === 1 && (
        <div className='flex flex-col m-auto justify-center items-center w-full md:w-[30%] gap-4'>
          <h1 className='font-medium'> Transfer type: </h1>
          <SelectInput
            option={[
              { value: '', label: 'Select account' },
              { value: 'Local bank', label: 'Local bank' },
              { value: 'Oversea bank', label: 'Oversea bank' },
            ]}
            name='fundType'
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
            ) => setFundType((e.target as HTMLSelectElement).value)}
          />
        </div>
      )}

      {step === 1 &&
        (fundType === 'Oversea bank' || fundType === 'Local bank') && (
          <>
            <div className='flex flex-col m-auto justify-center items-center w-full md:w-[30%] my-4'>
              <SelectInput
                option={countries}
                name='country'
                value={formData.country}
                onChange={handleChange}
                label='Choose country sending to'
                border={
                  errors.country ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                }
              />
            </div>
          </>
        )}
      {formData.country === '' ? (
        ''
      ) : (
        <form>
          {step === 1 && (
            <>
              <div className='flex md:flex-row flex-col items-center justify-between gap-5 w-full '>
                <HomeInput
                  name='amount'
                  type={'text'}
                  placeholder={''}
                  label='Enter Amount to be Transfer in USD'
                  value={formData.amount}
                  onChange={handleChange}
                  border={
                    errors.amount ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                <HomeInput
                  name='name'
                  type={'text'}
                  placeholder={''}
                  label='Recipient Name'
                  value={formData.name}
                  onChange={handleChange}
                  border={errors.name ? 'border-[#EF4444]' : 'border-[#E8ECEF]'}
                />
              </div>
              <div className='flex md:flex-row flex-col items-center justify-between gap-5 w-full my-7 '>
                <HomeInput
                  name='acctNumber'
                  type={'text'}
                  placeholder={''}
                  label='IBAN or Recepient Account Number'
                  value={formData.acctNumber}
                  onChange={handleChange}
                  border={
                    errors.acctNumber ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                <HomeInput
                  name='bankName'
                  type={'text'}
                  placeholder={''}
                  label='Swift code or Recipient Bank Name'
                  value={formData.bankName}
                  onChange={handleChange}
                  border={
                    errors.bankName ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
              </div>
              <div className='flex md:flex-row flex-col items-center justify-between gap-5 w-full '>
                <HomeInput
                  name='bankBranch'
                  type={'text'}
                  placeholder={''}
                  label='Recepient Bank Branch Address(Add routing code if applicable)'
                  value={formData.bankBranch}
                  onChange={handleChange}
                  border={
                    errors.bankBranch ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                <HomeInput
                  name='onlinePin'
                  type={'text'}
                  placeholder={''}
                  label='Online Pin'
                  value={formData.onlinePin}
                  onChange={handleChange}
                  border={
                    errors.onlinePin ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
              </div>
            </>
          )}
          {step === 2 && (
            <div className='my-6 md:w-1/2 w-full flex flex-col m-auto justify-center '>
              <h1 className='text-md font-bold my-3 text-[blue]'>
                Transfer Summary
              </h1>
              <div className='flex justify-between items-center'>
                <strong>Amount:</strong>
                <p>{formData.amount}</p>
              </div>
              <div className='flex justify-between items-center my-6'>
                <strong>Recipient Name:</strong>
                <p>{formData.name}</p>
              </div>
              <div className='flex justify-between items-center '>
                <strong>Account Number:</strong>
                <p>{formData.acctNumber}</p>
              </div>
              <div className='flex justify-between items-center my-6'>
                <strong>Bank Name:</strong>
                <p>{formData.bankName}</p>
              </div>
              <div className='flex justify-between items-center '>
                <strong>Bank Address:</strong>
                <p>{formData.bankBranch}</p>
              </div>
              <div className='flex justify-between items-center my-6'>
                <strong>Online Pin:</strong>
                <p>{formData.onlinePin}</p>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className='my-6 md:w-1/2 w-full flex flex-col m-auto justify-center '>
              <h1 className='text-md font-bold my-3 text-[blue]'>
                Terms & Agreement
              </h1>

              <div className='flex items-center gap-4'>
                <input type='checkbox' className='cursor-pointer' />
                <p>I accept the Terms & Conditions</p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className='my-6 md:w-1/2 w-full flex flex-col m-auto justify-center '>
              {loading ? (
                <div className='flex flex-col justify-center items-center py-20'>
                  <div className='animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid'></div>
                  <p>Please wait why we process your transaction...</p>
                </div>
              ) : (
                <>
                  {tanCode && (
                    <>
                      <p className='text-[red]'>
                        You need to enter TAC to Proceed
                      </p>
                      <div className='flex items-center gap-2 '>
                        <HomeInput type={'text'} placeholder={'Enter TAC'} />
                        <HomeButton
                          title={'Continue'}
                          type={'submit'}
                          bg={'blue'}
                          width={''}
                          onClick={() => setTanCode(false)}
                        />
                      </div>
                    </>
                  )}

                  {tanCode === false && (
                    <>
                      <p className='text-[red]'>
                        You need to enter DWTC code to Proceed
                      </p>
                      <div className='flex items-center gap-2 '>
                        <HomeInput type={'text'} placeholder={'Enter TAC'} />
                        <HomeButton
                          title={'Continue'}
                          type={'button'}
                          bg={'blue'}
                          width={''}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {step === 5 && (
            <>
              <p className='text-[red]'>Please provide Non Resident tax Code</p>
              <div className='flex items-center gap-2 '>
                <HomeInput type={'text'} placeholder={'Enter TAC'} />
                <HomeButton
                  title={'Continue'}
                  type={'submit'}
                  bg={'blue'}
                  width={''}
                />
              </div>
            </>
          )}

          {step === 1 || step === 2 || step === 3 ? (
            <div className='w-full flex  m-auto gap-10 justify-between items-center my-7 md:w-[30%] '>
              <HomeButton
                title={'Prev'}
                type={'button'}
                bg={'gray'}
                width={'50%'}
                onClick={prevStep}
              />
              <HomeButton
                title={'Next'}
                type={'button'}
                bg={'#3c1414'}
                width={'50%'}
                onClick={nextStep}
              />
            </div>
          ) : (
            ''
          )}
        </form>
      )}
    </MainDashboard>
  );
};

export default Transfer;
