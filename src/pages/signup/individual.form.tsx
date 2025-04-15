import { useState, FC } from 'react';
import { z } from 'zod';
import {
  individualSchema,
  step1Schema,
  step2Schema,
  step3Schema,
} from '../../utils/validation';

import { IndividualFormProps } from '../../utils/interface';
import axios from 'axios';
import HomeInput from '../../components/input';
import SelectInput from '../../components/selectInput';
import HomeButton from '../../components/button';

interface ValidationErrors {
  firstName?: { _errors: string[] };
  lastName?: { _errors: string[] };
  phoneNumber?: { _errors: string[] };
  password?: { _errors: string[] };
  confirmPassword?: { _errors: string[] };
  email?: { _errors: string[] };
  verificationCode?: { _errors: string[] };
}

type FormData = z.infer<typeof individualSchema>;

const IndividualForm: FC<IndividualFormProps> = ({
  setCompleteRegistration,
  setFormHeader,
  step,
  nextStep,
  prevStep,
  setApiError,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    verificationCode: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = async () => {
    let result;
    if (step === 1) {
      result = step1Schema.safeParse(formData);
      if (result.success) {
        localStorage.setItem('email', formData.email);
      }
    } else if (step === 2) {
      result = step2Schema.safeParse(formData);
      if (result.success) {
        localStorage.setItem('phoneNumber', formData.phoneNumber);

        // Move API call here
        try {
          setLoading(true);
          const { firstName, lastName, password, email, phoneNumber } =
            formData;
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/register-individual`,
            { firstName, lastName, password, email, phoneNumber }
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
          firstName: validationErrors.firstName?._errors[0] || '',
          lastName: validationErrors.lastName?._errors[0] || '',
          email: validationErrors.email?._errors[0] || '',
        }),
        ...(step === 2 && {
          password: validationErrors.password?._errors[0] || '',
          confirmPassword: validationErrors.confirmPassword?._errors[0] || '',
          phoneNumber: validationErrors.phoneNumber?._errors[0] || '',
        }),
      }));
      return;
    }

    if (step !== 2) {
      nextStep(); // Proceed to next step only if it's not step 2 (handled inside API call)
    }
  };

  const handleFinishRegistration = async () => {
    // Validate step 3 using step3Schema
    const result = step3Schema.safeParse(formData);
    if (!result.success) {
      const validationErrors = result.error?.format() || {};
      setErrors((prevErrors) => ({
        ...prevErrors,
        verificationCode:
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
      {step === 1 && (
        <>
          <div className='flex items-center gap-5'>
            <div>
              <HomeInput
                type={'text'}
                placeholder={'Enter your First Name'}
                label='Your First Name'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                border={
                  errors.firstName ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                }
              />
              {errors.firstName && (
                <p className='text-[#EF4444] text-[10px] font-medium'>
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <HomeInput
                type={'text'}
                placeholder={'Enter your Last Name'}
                label='Your Last Name'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                border={
                  errors.lastName ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                }
              />
              {errors.lastName && (
                <p className='text-[#EF4444] text-[10px] font-medium'>
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
          <div className='mt-5'>
            <HomeInput
              type={'email'}
              placeholder={'Enter your Email'}
              label='Your Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              border={errors.email ? 'border-[#EF4444]' : 'border-[#E8ECEF]'}
            />
            {errors.email && (
              <p className='text-[#EF4444] text-[10px] font-medium'>
                {errors.email}
              </p>
            )}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <HomeInput
              type={'password'}
              placeholder={'Enter your Password'}
              label='Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              border={errors.password ? 'border-[#EF4444]' : 'border-[#E8ECEF]'}
            />
            {errors.password && (
              <p className='text-[#EF4444] text-[10px] font-medium'>
                {errors.password}
              </p>
            )}
          </div>
          <div className='my-5'>
            <HomeInput
              type={'password'}
              placeholder={'Confirm Password'}
              label='Confirm Password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              border={
                errors.confirmPassword ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
              }
            />
            {errors.confirmPassword && (
              <p className='text-[#EF4444] text-[10px] font-medium'>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <h3 className='text-[#1E1E1E] text-[14px] font-roboto'>
            Phone Number
          </h3>
          <div className='flex items-center gap-3'>
            <div className='w-[30%]'>
              <SelectInput
                option={[{ value: '+123', label: '+123' }]}
                name={''}
                value={''}
                onChange={handleChange}
                border={
                  errors.phoneNumber ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                }
              />
              {errors.phoneNumber && (
                <p className='text-[#EF4444] text-[10px] font-medium'>
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <div className='w-full'>
              <HomeInput
                type={'text'}
                placeholder={'Enter your Phone Number'}
                label=''
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                border={
                  errors.phoneNumber ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                }
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (!/[0-9 +]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              {errors.phoneNumber && (
                <p className='text-[#EF4444] text-[10px] font-medium'>
                  {errors.phoneNumber}
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <div>
          <p className='text-[14px] text-[#1E1E1E] mb-6 '>
            Enter the 4-digit code that was sent to{' '}
            {localStorage.getItem('phoneNumber')} and{' '}
            {localStorage.getItem('email')}
          </p>
          <div>
            <HomeInput
              type='text'
              placeholder='Enter code'
              name='verificationCode'
              value={formData.verificationCode}
              onChange={handleChange}
              border={
                errors.verificationCode
                  ? 'border-[#EF4444]'
                  : 'border-[#E8ECEF]'
              }
              onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
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
          <p className='mt-2.5 text-[#98A9BCCC] text-[12px] text-center'>
            Resend Code
          </p>
        </div>
      )}

      <div className='flex justify-center mt-6'>
        {step < 3 && (
          <HomeButton
            title={step === 2 ? 'VERIFY ACCOUNT' : 'NEXT STEP'}
            bg=''
            onClick={handleNextStep}
            color={'#D71E0E'}
            disabled={loading}
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
              className=' text-[14px] font-medium cursor-pointer'
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
  );
};

export default IndividualForm;
