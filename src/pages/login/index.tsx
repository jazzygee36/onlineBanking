import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { z } from 'zod';
import { signInSchema } from '../../utils/validation';
// import ChatBoxContainer from '../../common/chatBoxContainer';
import axios from 'axios';

import HomeInput from '../../components/input';
import HomeButton from '../../components/button';
import Toast from '../../components/toast';

type FormData = z.infer<typeof signInSchema>;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toast, setToast] = useState<{
    message: string;
    type?: 'success' | 'error' | 'info';
  } | null>(null);
  const showToast = (message: string, type?: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };
  const [loading, setLoading] = useState<boolean>(false); // Added loading state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // setApiError(null);
    setLoading(true); // Start loading

    const result = signInSchema.safeParse(formData);
    if (!result.success) {
      const validationErrors = result.error.format();
      setErrors({
        email: validationErrors.email?._errors[0] || '',
        password: validationErrors.password?._errors[0] || '',
      });
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      const { email, password } = formData;
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        {
          email,
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
      if (res.data.message === 'Login successful') {
        showToast(`${res.data.message}`, 'success');
        const token = res.data.token;
        localStorage.setItem('token', token);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else if (res.data.message === 'Invalid credentials') {
        showToast('Not a user, please register', 'error'); // maybe this should be 'error'?
      } else {
        showToast(res?.data?.message || 'Unexpected response', 'info');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      showToast(
        error.response?.data?.message ||
          'Something went wrong. Please try again.',
        'error'
      );
    } finally {
      setLoading(false); // Stop loading after API response
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className='z-100 w-full'>
          <img
            src={`https://www.trustensurefinance.com/InternetBanking/img/logo2.png`}
            alt='logo'
            className='w-full'
          />
        </div>

        <div className='w-[95%] md:w-[555px] m-auto bg-white p-5 md:p-11 rounded-md text-[#1E1E1E] flex flex-col items-center'>
          <div className='mb-[40px]'>
            <h1 className='text-center text-[30px] font-[400] font-roboto text-[#1B1E24]'>
              Welcome to Trust Ensure Finance
            </h1>
            <p className='text-center text-[#252631] text-[14px] font-[400]'>
              Enter your login credentials below.
            </p>
          </div>
          <form onSubmit={handleSignIn} className='w-full'>
            <div>
              <HomeInput
                type='email'
                placeholder='Enter your Email'
                label='Enter email'
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
            <div className='my-5 w-full'>
              <HomeInput
                type='password'
                placeholder='Enter your Password'
                label='Enter password'
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
            <div className='flex items-center justify-between w-full mb-5'>
              <div className='flex items-center gap-1 cursor-pointer'>
                <input type='checkbox' />
                <h3 className='text-[#140706] text-[14px] font-[400]'>
                  Stay Signed in
                </h3>
              </div>
              <div>
                <h2
                  className='text-[#D71E0E] text-[14px] font-[400] cursor-pointer'
                  // onClick={() => navigate('/password-reset')}
                >
                  Forget password?
                </h2>
              </div>
            </div>
            <div className='w-full'>
              <HomeButton
                title={loading ? 'Loading...' : 'Login'}
                type='submit'
                bg={'#3c1414'}
                color={'#ffffff'}
                disabled={loading}
                width={'100%'}
              />
            </div>
          </form>
          <div className='w-full mt-5'>
            <HomeButton
              title={'Back'}
              onClick={handleBack}
              bg={'#F8FAFB'}
              color={'#1E1E1E'}
              type={'submit'}
              width={'100%'}
            />
          </div>
          <Link to='/register'>
            <p className='mt-1'>
              Don't have an account?{' '}
              <span className='cursor-pointer text-[blue]'>Sign up </span>
            </p>
          </Link>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default Login;
