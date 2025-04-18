import HomeButton from '../../components/button';
import MainDashboard from '../../components/dashboard';
import HomeInput from '../../components/input';

const Profile = () => {
  return (
    <MainDashboard title={'Profile'}>
      <h1 className='font-medium my-6 md:hidden block'>Profile Settings</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7 w-full '>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
          <div className='w-full'>
            <HomeInput type={'text'} placeholder={''} label='Account number' />
          </div>
        </div>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
          <div className='w-full'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Account username'
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-7 items-center  w-full'>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} label='Change password' />
          </div>
        </div>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} label='Email address' />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7 my-7  w-full'>
        <div className='  flex items-center gap-1 md:gap-10 w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput
              type={'text'}
              placeholder={''}
              label='Telephone number'
            />
          </div>
        </div>
        <div className='   flex items-center gap-1 md:gap-10 w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput type={'date'} placeholder={''} label='Date of Birth' />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-7  w-full '>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%] '>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} label='Occupation' />
          </div>
        </div>
        <div className='  mb-4 flex items-center gap-1 md:gap-10  w-[100%]'>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} label='Postal address' />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col m-auto justify-center items-center md:w-[30%] my-4'>
        <HomeButton
          title={'Update Changes'}
          type={'submit'}
          bg={'#3c1414'}
          width={'100%'}
        />
      </div>
    </MainDashboard>
  );
};

export default Profile;
