import { FC, useEffect, useState } from 'react';
import MainDashboard from '../../components/dashboard';
import SelectInput from '../../components/selectInput';
import HomeButton from '../../components/button';
import { countries } from '../../utils/countries';
import { z } from 'zod';
import {
  transferFunSchema,
  transferStep1Schema,
  transferStep2Schema,
  transferStep3Schema,
  transferStep4Schema,
} from '../../utils/validation';
import HomeInput from '../../components/input';
import Success from './success';
import { TransferFundProps } from '../../utils/interface';

interface ValidationErrors {
  amount?: { _errors: string[] };
  name?: { _errors: string[] };
  acctNumber?: { _errors: string[] };
  bankName?: { _errors: string[] };
  bankAddress?: { _errors: string[] };

  onlinePin?: { _errors: string[] };
  terms?: { _errors: string[] };
  tacCode?: { _errors: string[] };
  dwtcCode?: { _errors: string[] };
  noneResidentTax?: { _errors: string[] };
  country?: { _errors: string[] };
}

type FormData = z.infer<typeof transferFunSchema>;

const TransferFund: FC<TransferFundProps> = () => {
  const [fundType, setFundType] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState<'TAC' | 'DWTC' | 'NON_RESIDENT'>(
    'TAC'
  );
  const [formData, setFormData] = useState<FormData>({
    amount: '',
    name: '',
    acctNumber: '',
    bankName: '',
    bankAddress: '',

    onlinePin: '',
    terms: '',
    tacCode: '',
    dwtcCode: '',
    noneResidentTax: '',
    country: '',
  });

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleNextStep = async () => {
    let result;
    if (step === 1) {
      result = transferStep1Schema.safeParse(formData);
    } else if (step === 2) {
      result = transferStep2Schema.safeParse(formData);
    } else if (step === 3) {
      result = transferStep3Schema.safeParse(formData);
    } else if (step === 4) {
      result = transferStep4Schema.safeParse(formData);
    } else {
      result = { success: true };
    }

    if (!result.success) {
      const validationErrors = (result.error?.format() ||
        {}) as ValidationErrors;
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...(step === 1 && {
          country: validationErrors.country?._errors[0] || '',
          amount: validationErrors.amount?._errors[0] || '',
          name: validationErrors.name?._errors[0] || '',
          acctNumber: validationErrors.acctNumber?._errors[0] || '',
          bankName: validationErrors.bankName?._errors[0] || '',
          bankAddress: validationErrors.bankAddress?._errors[0] || '',

          onlinePin: validationErrors.onlinePin?._errors[0] || '',
        }),
        ...(step === 2 &&
          {
            // similar mapping
          }),
        ...(step === 3 && {
          terms: validationErrors.terms?._errors[0] || '',
        }),
        ...(step === 4 && {
          tacCode: validationErrors.tacCode?._errors[0] || '',
          dwtcCode: validationErrors.dwtcCode?._errors[0] || '',
          noneResidentTax: validationErrors.noneResidentTax?._errors[0] || '',
        }),
      }));
      return; // 🚨 returns early if invalid
    }

    // ✅ Validation passed
    nextStep();
  };

  useEffect(() => {
    setErrors({});
  }, [step]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // const handleSubmit = async () => {
  //   const result = transferFunSchema.safeParse(formData);
  //   if (result.success) {
  //     // Send the data to API or whatever you want to do
  //   } else {
  //     const validationErrors = result.error.format() as ValidationErrors;
  //     setErrors({
  //       // map the errors like before
  //     });
  //   }
  // };

  const handleSubStepNext = () => {
    if (subStep === 'TAC' && !formData.tacCode) {
      setErrors((prev) => ({ ...prev, tacCode: 'TAC Code is required' }));
      return;
    }

    if (subStep === 'DWTC' && !formData.dwtcCode) {
      setErrors((prev) => ({ ...prev, dwtcCode: 'DWTC Code is required' }));
      return;
    }

    if (subStep === 'NON_RESIDENT' && !formData.noneResidentTax) {
      setErrors((prev) => ({
        ...prev,
        noneResidentTax: 'Non-Resident Tax is required',
      }));
      return;
    }

    // If input is filled, move to next subStep
    if (subStep === 'TAC') {
      setSubStep('DWTC');
    } else if (subStep === 'DWTC') {
      setSubStep('NON_RESIDENT');
    } else if (subStep === 'NON_RESIDENT') {
      nextStep(); // move to final success page after last input
    }
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
                  name='name'
                  type={'text'}
                  placeholder={''}
                  label='Recipient Name'
                  value={formData.name}
                  onChange={handleChange}
                  border={errors.name ? 'border-[#EF4444]' : 'border-[#E8ECEF]'}
                />
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
                  name='bankAddress'
                  type={'text'}
                  placeholder={''}
                  label='Recepient Bank Branch Address(Add routing code if applicable)'
                  value={formData.bankAddress}
                  onChange={handleChange}
                  border={
                    errors.bankAddress ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
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
                <p>{formData.bankAddress}</p>
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

              <div className='flex flex-col items-start my-6'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    name='terms'
                    checked={formData.terms === 'true'}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        terms: e.target.checked ? 'true' : '',
                      }))
                    }
                    className='h-4 w-4'
                  />
                  <span>I agree to the terms and conditions</span>
                </label>
                {errors.terms && (
                  <p className='text-red-500 text-sm'>{errors.terms}</p>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className='my-6 md:w-1/2 w-full flex flex-col m-auto justify-center '>
              {loading ? (
                <div className='flex flex-col justify-center items-center py-20'>
                  <div className='animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid'></div>
                  <p>Please wait while we process your transaction...</p>
                </div>
              ) : (
                <>
                  {subStep === 'TAC' && (
                    <>
                      <p className='text-[red]'>
                        You need to enter TAC to Proceed
                      </p>
                      <div className='flex items-center gap-2'>
                        <HomeInput
                          type={'text'}
                          placeholder={'Enter TAC'}
                          name='tacCode' // Make sure name is set
                          value={formData.tacCode} // Bind the value to formData.tacCode
                          onChange={handleChange}
                          border={
                            errors.tacCode
                              ? 'border-[#EF4444]'
                              : 'border-[#E8ECEF]'
                          }
                        />
                        <HomeButton
                          title={'Continue'}
                          type={'button'}
                          bg={'blue'}
                          width={''}
                          // onClick={() => setSubStep('DWTC')}
                          onClick={handleSubStepNext}
                        />
                      </div>
                      {errors.tacCode && (
                        <p className='text-red-500 text-sm'>{errors.terms}</p>
                      )}
                    </>
                  )}

                  {subStep === 'DWTC' && (
                    <>
                      <p className='text-[red]'>
                        You need to enter DWTC Code to Proceed
                      </p>
                      <div className='flex items-center gap-2'>
                        <HomeInput
                          type={'text'}
                          placeholder={'Enter DWTC'}
                          name='dwtcCode' // Make sure name is set
                          value={formData.dwtcCode} // Bind the value to formData.tacCode
                          onChange={handleChange}
                          border={
                            errors.dwtcCode
                              ? 'border-[#EF4444]'
                              : 'border-[#E8ECEF]'
                          }
                        />
                        <HomeButton
                          title={'Continue'}
                          type={'button'}
                          bg={'blue'}
                          width={''}
                          // onClick={() => setSubStep('NON_RESIDENT')}
                          onClick={handleSubStepNext}
                        />
                      </div>
                      {errors.dwtcCode && (
                        <p className='text-red-500 text-sm'>{errors.terms}</p>
                      )}
                    </>
                  )}

                  {subStep === 'NON_RESIDENT' && (
                    <>
                      <p className='text-[red]'>
                        Please provide Non-Resident Tax Code
                      </p>
                      <div className='flex items-center gap-2'>
                        <HomeInput
                          type={'text'}
                          placeholder={'Enter Non-ResidentTax Code'}
                          name='noneResidentTax' // Make sure name is set
                          value={formData.noneResidentTax} // Bind the value to formData.tacCode
                          onChange={handleChange}
                          border={
                            errors.noneResidentTax
                              ? 'border-[#EF4444]'
                              : 'border-[#E8ECEF]'
                          }
                        />
                        <HomeButton
                          title={'Continue'}
                          type={'submit'}
                          bg={'blue'}
                          width={''}
                          onClick={nextStep}
                        />
                      </div>
                      {errors.noneResidentTax && (
                        <p className='text-red-500 text-sm'>{errors.terms}</p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {step === 5 && <Success />}

          {step === 1 || step === 2 || step === 3 ? (
            <div className='w-full flex  m-auto gap-10 justify-between items-center my-7 md:w-[30%] '>
              {step === 1 ? (
                ''
              ) : (
                <HomeButton
                  title={'Prev'}
                  type={'button'}
                  bg={'gray'}
                  width={'50%'}
                  onClick={prevStep}
                />
              )}
              <HomeButton
                title={'Next'}
                type={'button'}
                bg={'#3c1414'}
                width={'50%'}
                onClick={handleNextStep}
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

export default TransferFund;
