import HomeButton from '../../components/button';
import HomeInput from '../../components/input';

const SignUp = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div>a </div>
      <div className='bg-yellow-100 h-[100vh] flex flex-col justify-center px-[95%] md:px-[25%]'>
        <HomeInput
          type={'text'}
          label={'Username'}
          placeholder='Enter username'
        />
        <div className='my-5'>
          <HomeInput
            type={'password'}
            label={'Password'}
            placeholder='Enter password'
          />
        </div>
        <HomeButton
          title={'Sign up'}
          type={'submit'}
          bg={'#3c1414'}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default SignUp;
