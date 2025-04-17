import MainDashboard from '../../components/dashboard';
import HomeInput from '../../components/input';

const Profile = () => {
  return (
    <MainDashboard title={'Profile'}>
      <h1 className='font-medium mt-6'>Profile Settings</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center  w-full my-2'>
        <div className=' p-4  flex items-center gap-10 w-[100%]'>
          <h1 className='font-normal'> Account number: </h1>
          <div className='w-full'>
            <HomeInput type={'text'} placeholder={''} />
          </div>
        </div>
        <div className=' p-4  flex items-center gap-10 w-[100%]'>
          <h1 className='font-normal'> Account username: </h1>
          <div className='w-full'>
            <HomeInput type={'text'} placeholder={''} />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center mb-2 w-full'>
        <div className=' p-4  flex items-center gap-10 w-[100%] '>
          <h1 className='font-normal'> Change password: </h1>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} />
          </div>
        </div>
        <div className=' p-4  flex items-center gap-10 w-[100%]'>
          <h1 className='font-normal'> Email address: </h1>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center  w-full mb-2'>
        <div className=' p-4  flex items-center gap-10 w-[100%] '>
          <h1 className='font-normal'> Telephone number: </h1>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} />
          </div>
        </div>
        <div className=' p-4  flex items-center gap-10 w-[100%]'>
          <h1 className='font-normal'> Date of Birth: </h1>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center  w-full mb-2'>
        <div className=' p-4 mb-4 flex items-center gap-10  w-[100%] '>
          <h1 className='font-normal'> Occupation: </h1>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} />
          </div>
        </div>
        <div className=' p-4 mb-4 flex items-center gap-10  w-[100%]'>
          <h1 className='font-normal'> Poster address: </h1>
          <div className='w-[100%]'>
            <HomeInput type={'text'} placeholder={''} />
          </div>
        </div>
      </div>
    </MainDashboard>
  );
};

export default Profile;
