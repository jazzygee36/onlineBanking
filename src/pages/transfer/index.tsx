import MainDashboard from '../../components/dashboard';
import SelectInput from '../../components/selectInput';

const Transfer = () => {
  return (
    <MainDashboard title={'Tranfer'}>
      <h1 className='font-medium mt-6'>Funds Transfer</h1>
      <div className='w-full bg-gray-200 p-4 my-4 flex items-center justify-between '>
        <div className='flex  gap-4'>
          <h1 className='font-medium'> Account Number: </h1>
          <h1> 003994415280</h1>
        </div>
      </div>
      <div className='flex flex-col m-auto justify-center items-center w-full md:w-[30%]  gap-4'>
        <h1 className='font-medium'> Destination Account: </h1>
        <SelectInput
          option={[
            { value: '', label: 'Select account' },
            { value: '', label: 'Local bank' },
            { value: '', label: 'Oversea bank' },
          ]}
          name={''}
        />
      </div>
    </MainDashboard>
  );
};

export default Transfer;
