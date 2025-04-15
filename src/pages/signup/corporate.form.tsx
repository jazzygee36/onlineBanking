import { useState, useEffect, FC } from 'react';

import { z } from 'zod';
import {
  corporateSchema,
  corporateStep1Schema,
  corporateStep2Schema,
  corporateStep3Schema,
} from '../../utils/validation';
import axios from 'axios';
import HomeInput from '../../components/input';
import SelectInput from '../../components/selectInput';
import HomeButton from '../../components/button';
import { CorporateFormProps } from '../../utils/interface';

interface ValidationErrors {
  companyName?: { _errors: string[] };
  businessType?: { _errors: string[] };
  incorporationDate?: { _errors: string[] };
  password?: { _errors: string[] };
  confirmPassword?: { _errors: string[] };
  email?: { _errors: string[] };
  verificationCode?: { _errors: number[] };
}

type FormData = z.infer<typeof corporateSchema>;

const CorporateForm: FC<CorporateFormProps> = ({
  completeRegistration,
  setCompleteRegistration,
  setFormHeader,
  step,
  nextStep,
  prevStep,
  setApiError,
}) => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    businessType: '',
    incorporationDate: new Date(),
    password: '',
    confirmPassword: '',
    email: '',
    verificationCode: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [, setLoading] = useState<boolean>(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'incorporationDate'
          ? new Date(value) // convert the date string to a Date object
          : value,
    }));
  };

  const handleSubmit = async () => {
    let result;
    if (step === 1) {
      result = corporateStep1Schema.safeParse(formData);
    } else if (step === 2) {
      result = corporateStep2Schema.safeParse(formData);
      if (result.success) {
        localStorage.setItem('email', formData.email);

        // Move API call here
        try {
          setLoading(true);
          const {
            companyName,
            businessType,
            password,

            email,
          } = formData;
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/register-corporate`,
            {
              companyName,
              businessType,
              password,
              incorporationDate:
                formData.incorporationDate instanceof Date
                  ? formData.incorporationDate.toISOString() // send ISO string
                  : formData.incorporationDate,
              email,
            }
          );

          if (res.data.message === 'Successfully registered.') {
            nextStep();
          } else {
            setApiError('Registration failed. Please try again.');
          }
        } catch (error: any) {
          setApiError(
            error.response?.data?.message ||
              'Something went wrong. Please try again.'
          );
        } finally {
          setLoading(false);
        }
      }
    } else {
      result = { success: true };
    }

    if (!result.success) {
      const validationErrors = (result.error?.format() ||
        {}) as ValidationErrors;
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...(step === 1 && {
          companyName: validationErrors.companyName?._errors[0] || '',
          businessType: validationErrors.businessType?._errors[0] || '',
          incorporationDate:
            validationErrors.incorporationDate?._errors[0] || '',
        }),
        ...(step === 2 && {
          password: validationErrors.password?._errors[0] || '',
          confirmPassword: validationErrors.confirmPassword?._errors[0] || '',
          email: validationErrors.email?._errors[0] || '',
        }),
      }));
      return; // Exit if validation fails
    }

    if (step !== 2) {
      nextStep(); // Proceed to next step only if it's not step 2 (handled inside API call)
    }
  };

  useEffect(() => {
    if (step === 3) {
      setFormHeader(true);
    }
  }, [step, setFormHeader]);

  useEffect(() => {
    console.log('completeRegistration updated:', completeRegistration);
  }, [completeRegistration]);

  const handleFinishRegistration = async () => {
    // Validate step 3 using corporateStep3Schema
    const result = corporateStep3Schema.safeParse(formData);
    if (!result.success) {
      const validationErrors = result.error?.format() || {};
      setErrors((prevErrors) => ({
        ...prevErrors,
        code:
          validationErrors.verificationCode?._errors[0] || 'Code is required',
      }));
      return; // Do not finish registration if validation fails
    }
    try {
      setLoading(true);
      const { verificationCode, email } = formData;
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/verify`, {
        verificationCode,
        email,
      });

      if (res.data.message === 'Email successfully verified') {
        localStorage.setItem('token', res.data.token);
        nextStep();
        setCompleteRegistration(true);
      } else {
        setApiError('Registration failed. Please try again.');
      }
    } catch (error: any) {
      setApiError(
        error.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!completeRegistration && (
        <div>
          {step === 1 && (
            <div>
              <div>
                <HomeInput
                  type='text'
                  name='companyName'
                  placeholder='Company Name'
                  label='Company Name'
                  value={formData.companyName}
                  onChange={handleChange}
                  border={
                    errors.companyName ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.companyName && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.companyName}
                  </p>
                )}
              </div>
              <div className='flex items-center gap-3 mt-[22px]'>
                <div className='w-full'>
                  <SelectInput
                    label='Type of Business'
                    option={[
                      { value: '', label: 'Select Type of Business' },
                      { value: 'partnership', label: 'Partnership' },
                      { value: 'cooperative', label: 'Cooperative' },
                      { value: 'nonprofit', label: 'Nonprofit Organization' },
                      { value: 'franchise', label: 'Franchise' },
                    ]}
                    name='businessType'
                    value={formData.businessType}
                    onChange={handleChange}
                    border={
                      errors.businessType
                        ? 'border-[#EF4444]'
                        : 'border-[#E8ECEF]'
                    }
                  />
                  {errors.businessType && (
                    <p className='text-[#EF4444] text-[10px] font-medium'>
                      {errors.businessType}
                    </p>
                  )}
                </div>
                <div className='w-full'>
                  <HomeInput
                    type='date'
                    name='incorporationDate'
                    placeholder='Select Date'
                    label='Date of Incorporation'
                    value={
                      formData.incorporationDate
                        ? formData.incorporationDate.toISOString().split('T')[0]
                        : ''
                    }
                    onChange={handleChange}
                    border={
                      errors.incorporationDate
                        ? 'border-[#EF4444]'
                        : 'border-[#E8ECEF]'
                    }
                  />
                  {errors.incorporationDate && (
                    <p className='text-[#EF4444] text-[10px] font-medium'>
                      {errors.incorporationDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div>
                <HomeInput
                  type='email'
                  name='email'
                  placeholder='Company email'
                  label='Company email'
                  value={formData.email}
                  onChange={handleChange}
                  border={
                    errors.email ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.email && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className='my-5'>
                <HomeInput
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  label='Password'
                  value={formData.password}
                  onChange={handleChange}
                  border={
                    errors.password ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.password && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.password}
                  </p>
                )}
              </div>
              <div>
                <HomeInput
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm your password'
                  label='Confirm Password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  border={
                    errors.confirmPassword
                      ? 'border-[#EF4444]'
                      : 'border-[#E8ECEF]'
                  }
                />
                {errors.confirmPassword && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className='text-[14px] text-[#1E1E1E] mb-6 text-center'>
                Enter the 4-digit code that was sent to{' '}
                {localStorage.getItem('email')}
              </p>
              <div>
                <HomeInput
                  type='text'
                  placeholder='Enter code'
                  name='verificationCode'
                  value={formData.verificationCode}
                  onChange={handleChange}
                  border={errors.code ? 'border-[#EF4444]' : 'border-[#E8ECEF]'}
                  onKeyPress={(
                    event: React.KeyboardEvent<HTMLInputElement>
                  ) => {
                    if (!/[0-9 +]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                {errors.verificationCode && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.verificationCode}
                  </p>
                )}
              </div>
              <p className='mt-2.5 text-[#98A9BCCC] text-[12px]'>Resend Code</p>
              <p className='text-[#98A9BCCC] text-[12px]'>
                Verify via Phone Call
              </p>
            </div>
          )}

          <div className='flex justify-center mt-6'>
            {step < 3 && (
              <HomeButton
                title='NEXT STEP'
                bg=''
                onClick={handleSubmit}
                color={'#D71E0E'}
                type={'submit'}
                width={''}
              />
            )}
            {step === 3 && (
              <div className='flex items-center justify-between w-full mt-44'>
                <h2
                  onClick={() => {
                    setFormHeader(false);
                    prevStep();
                  }}
                  className='text-[14px] font-medium cursor-pointer'
                >
                  BACK
                </h2>
                <h2
                  onClick={handleFinishRegistration}
                  className='text-[#D71E0E] text-[14px] font-medium cursor-pointer'
                >
                  FINISH
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CorporateForm;
