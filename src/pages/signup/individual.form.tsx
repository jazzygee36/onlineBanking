import { useState, FC } from 'react';
import { z } from 'zod';
import {
  individualSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from '../../utils/validation';

import { IndividualFormProps } from '../../utils/interface';
// import axios from 'axios';
import HomeInput from '../../components/input';
import SelectInput from '../../components/selectInput';
import HomeButton from '../../components/button';
import axios from 'axios';
import Toast from '../../components/toast';
import { countries } from '../../utils/countries';
// import { useNavigate } from 'react-router-dom';

interface ValidationErrors {
  firstName?: { _errors: string[] };
  lastName?: { _errors: string[] };
  phoneNumber?: { _errors: string[] };
  password?: { _errors: string[] };
  confirmPassword?: { _errors: string[] };
  email?: { _errors: string[] };
  username?: { _errors: string[] };
  occupation?: { _errors: string[] };
  gender?: { _errors: string[] };
  dob?: { _errors: string[] };
  country?: { _errors: string[] };
  state?: { _errors: string[] };
  city?: { _errors: string[] };
  zipCode?: { _errors: string[] };
  address?: { _errors: string[] };
  acctType?: { _errors: string[] };
  acctPin?: { _errors: string[] };
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
    // verificationCode: '',
    username: '',
    occupation: '',
    gender: '',
    dob: '',
    state: '',
    country: '',
    zipCode: '',
    city: '',
    address: '',
    acctType: '',
    acctPin: '',
  });
  // const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toast, setToast] = useState<{
    message: string;
    type?: 'success' | 'error' | 'info';
  } | null>(null);
  const showToast = (message: string, type?: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

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
        // localStorage.setItem('email', formData.email);
      }
    } else if (step === 2) {
      result = step2Schema.safeParse(formData);
    } else if (step === 3) {
      result = step3Schema.safeParse(formData);
    } else if (step === 4) {
      result = step4Schema.safeParse(formData);
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
          username: validationErrors.username?._errors[0] || '',
          occupation: validationErrors.occupation?._errors[0] || '',
          gender: validationErrors.gender?._errors[0] || '',
          // phoneNumber: validationErrors.phoneNumber?._errors[0] || '',
          dob: validationErrors.dob?._errors[0] || '',
        }),
        ...(step === 2 && {
          phoneNumber: validationErrors.phoneNumber?._errors[0] || '',
          country: validationErrors.country?._errors[0] || '',
          state: validationErrors.state?._errors[0] || '',
          city: validationErrors.city?._errors[0] || '',
          zipCode: validationErrors.zipCode?._errors[0] || '',
          address: validationErrors.address?._errors[0] || '',
        }),
        ...(step === 3 && {
          acctType: validationErrors.acctType?._errors[0] || '',
          acctPin: validationErrors.acctPin?._errors[0] || '',
        }),
        ...(step === 4 && {
          password: validationErrors.password?._errors[0] || '',
          confirmPassword: validationErrors.confirmPassword?._errors[0] || '',
        }),
      }));
      return;
    }

    if (step !== 4) {
      nextStep(); // Proceed to next step only if it's not step 2 (handled inside API call)
    }
  };

  const handleBack = () => {
    prevStep();
  };

  const handleFinishRegistration = async () => {
    // Validate step 3 using step3Schema
    const result = step4Schema.safeParse(formData);
    if (!result.success) {
      const validationErrors = result.error.format() as ValidationErrors;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validationErrors.password?._errors[0] || '',
        confirmPassword: validationErrors.confirmPassword?._errors[0] || '',
      }));
      return; // Do not finish registration if validation fails
    }
    try {
      const {
        zipCode,
        address,
        firstName,
        lastName,
        username,
        email,
        occupation,
        gender,
        dob,
        phoneNumber,
        country,
        state,
        city,
        acctType,
        acctPin,
        password,
      } = formData;
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        {
          zipCode,
          address,
          firstName,
          lastName,
          username,
          email,
          occupation,
          gender,
          dob,
          phoneNumber,
          country,
          state,
          city,
          acctType,
          acctPin,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
        // { withCredentials: true }
      );
      setLoading(true);
      if (res.data.message === 'Successfully registered') {
        showToast(`${res.data.message}`, 'success');
        // setTimeout(() => navigate('/dashboard'), 1000);
      } else if (res.data.message === 'Email already exist') {
        showToast('Not a user, please register', 'error'); // maybe this should be 'error'?
      } else if (res.data.message === 'Username already exist') {
        showToast('Not a user, please register', 'error'); // maybe this should be 'error'?
      } else {
        showToast(res?.data?.message || 'Unexpected response', 'info');
      }
      setLoading(true);

      setCompleteRegistration(true);
      setLoading(false);
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message ||
        'Something went wrong. Please try again.';
      setApiError(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
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
            <div className='mt-5 flex items-center gap-5 w-full'>
              <div className='w-[50%]'>
                <HomeInput
                  type={'text'}
                  placeholder={'Enter your Username'}
                  label='Your Username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  border={
                    errors.username ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.username && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.username}
                  </p>
                )}
              </div>
              <div className='w-[50%]'>
                <SelectInput
                  label='Select your Gender'
                  option={[
                    { value: '', label: 'Select gender' },
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                  ]}
                  name={'gender'}
                  value={formData.gender}
                  onChange={handleChange}
                  border={
                    errors.gender ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.gender && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>
            <div className='mt-5 flex items-center gap-5 w-full'>
              <div className='w-[50%]'>
                <HomeInput
                  type={'date'}
                  placeholder={'Select your Date of Birth'}
                  label='Your Date of Birth'
                  name='dob'
                  value={formData.dob}
                  onChange={handleChange}
                  border={errors.dob ? 'border-[#EF4444]' : 'border-[#E8ECEF]'}
                />
                {errors.dob && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.dob}
                  </p>
                )}
              </div>
              <div className='w-[50%]'>
                <HomeInput
                  type={'text'}
                  placeholder={'Enter your Occupation'}
                  label='Your Occupation'
                  name='occupation'
                  value={formData.occupation}
                  onChange={handleChange}
                  border={
                    errors.occupation ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.occupation && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.occupation}
                  </p>
                )}
              </div>
            </div>

            <div className='mt-5 w-full'>
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
            <div className='bg-[#3c1414] w-full h-[54px] mt-5 mb-5 text-white text-center flex items-center justify-center font-roboto text-[14px] font-medium'>
              Contact Information
            </div>
            <div className='my-5  items-center gap-5 w-full'>
              <div className=''>
                <SelectInput
                  label='Select your Country'
                  option={countries}
                  name={'country'}
                  value={formData.country}
                  onChange={handleChange}
                  border={
                    errors.country ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.country && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.country}
                  </p>
                )}
              </div>
              <div className='mt-5'>
                <HomeInput
                  type={'text'}
                  placeholder={'Enter your State'}
                  label='Enter your State'
                  name='state'
                  value={formData.state}
                  onChange={handleChange}
                  border={
                    errors.state ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.state && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <div className='my-5 flex items-center gap-5 w-full'>
              <div className='w-[50%]'>
                <HomeInput
                  type={'text'}
                  placeholder={'Enter your City'}
                  label='Enter your City'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  border={errors.city ? 'border-[#EF4444]' : 'border-[#E8ECEF]'}
                />
                {errors.city && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.city}
                  </p>
                )}
              </div>
              <div className='w-[50%]'>
                <HomeInput
                  type={'text'}
                  placeholder={'Enter your Zip Code'}
                  label='Enter your Zip Code'
                  name='zipCode'
                  value={formData.zipCode}
                  onChange={handleChange}
                  border={
                    errors.zipCode ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.zipCode && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.zipCode}
                  </p>
                )}
              </div>
            </div>
            <div className='my-5  items-center gap-5 w-full'>
              <div className=''>
                <HomeInput
                  type={'text'}
                  placeholder={'Enter your Address'}
                  label='Enter your Address'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  border={
                    errors.address ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.address && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.address}
                  </p>
                )}
              </div>
              <div className='mt-5'>
                <HomeInput
                  type={'text'}
                  placeholder={'Enter your Phone Number'}
                  label='Enter your Phone number'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  border={
                    errors.phoneNumber ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                  onKeyPress={(
                    event: React.KeyboardEvent<HTMLInputElement>
                  ) => {
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
          <>
            <div className='bg-[#3c1414] w-full py-2 mt-5 mb-5 text-white text-center  font-roboto text-[14px] font-medium'>
              <h2>Bank Account Information.</h2>
              <span className='text-1 text-gray-400 font-roboto text-center'>
                Your information is secure with us.
              </span>
            </div>

            <div className='my-5  gap-5 w-full'>
              <div className=''>
                <SelectInput
                  label='Select Account Type'
                  option={[
                    { value: '', label: 'select country' },
                    { value: 'current', label: 'Current Account' },
                    { value: 'saving', label: 'Savings Account' },
                    { value: 'fixed', label: 'Fixed deposite Account' },
                    { value: 'swift', label: 'Swift Account' },
                    { value: 'premium-swift', label: 'Premium Swift Account' },
                  ]}
                  name={'acctType'}
                  value={formData.acctType}
                  onChange={handleChange}
                  border={
                    errors.acctType ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                />
                {errors.acctType && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.acctType}
                  </p>
                )}
              </div>
              <div className='mt-5'>
                <HomeInput
                  type={'text'}
                  placeholder={'Enter your Pin'}
                  label='Enter Account Pin'
                  name='acctPin'
                  value={formData.acctPin}
                  onChange={handleChange}
                  border={
                    errors.acctPin ? 'border-[#EF4444]' : 'border-[#E8ECEF]'
                  }
                  onKeyPress={(
                    event: React.KeyboardEvent<HTMLInputElement>
                  ) => {
                    if (!/[0-9 +]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                {errors.acctPin && (
                  <p className='text-[#EF4444] text-[10px] font-medium'>
                    {errors.acctPin}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <div className='bg-[#3c1414] w-full h-[54px] mt-5 mb-5 text-white text-center flex items-center justify-center font-roboto text-[14px] font-medium'>
              Create Password
            </div>
            <div className=''>
              <HomeInput
                type={'password'}
                placeholder={'Enter your Password'}
                label='Password'
                name='password'
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
            <div className=''>
              <HomeInput
                type={'password'}
                placeholder={'Confirm Password'}
                label='Confirm Password'
                name='confirmPassword'
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
          </>
        )}

        <div className='flex justify-between items-center mt-6 w-full'>
          {step < 4 && (
            <div className='flex items-center justify-between w-[100%]'>
              <HomeButton
                title={step === 1 ? '' : 'BACK'}
                bg=''
                onClick={handleBack}
                color={'#3c1414'}
                disabled={loading}
                type={'submit'}
                width={''}
              />

              <HomeButton
                title={step < 4 ? 'NEXT STEP' : 'VERIFY ACCOUNT'}
                bg=''
                onClick={handleNextStep}
                color={'#D71E0E'}
                disabled={loading}
                type={'submit'}
                width={''}
              />
            </div>
          )}
          {step === 4 && (
            <div className='flex items-center justify-between w-full '>
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
                {loading ? 'Loading...' : ' FINISH'}
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default IndividualForm;
