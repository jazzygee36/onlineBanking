import { useState } from 'react';
import MainDashboard from '../../components/dashboard';
import SelectInput from '../../components/selectInput';
import HomeButton from '../../components/button';

const Transfer = () => {
  const [fundType, setFundType] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <MainDashboard title={'Transfer'}>
      <h1 className='font-medium mt-6 md:hidden block'>Funds Transfer</h1>

      <div className='w-full bg-gray-200 p-4 my-4 flex items-center justify-between '>
        <div className='flex gap-4'>
          <h1 className='font-medium'> Account Number: </h1>
          <h1> {user.acctNumber}</h1>
        </div>
      </div>

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

      {fundType === 'Oversea bank' && (
        <>
          <div className='flex flex-col m-auto justify-center items-center w-full md:w-[30%] my-4'>
            <SelectInput
              option={[
                { value: '', label: 'Select country' },
                { value: 'Canada', label: 'Canada' },
                { value: 'United State', label: 'United State' },
                { value: 'South Africa', label: 'South Africa' },
              ]}
              name='country'
            />
          </div>

          <div className='flex flex-col m-auto justify-center items-center w-full md:w-[30%] my-4'>
            <SelectInput
              option={[
                { value: '', label: 'Select currency' },
                { value: 'Dollar', label: 'Dollar' },
                { value: 'Pounds', label: 'Pounds' },
                { value: 'Sterling', label: 'Sterling' },
              ]}
              name='currency'
            />
          </div>
          <div className='w-full flex flex-col m-auto justify-center items-center md:w-[30%] my-4'>
            <HomeButton
              title={'Next'}
              type={'submit'}
              bg={'#3c1414'}
              width={'50%'}
            />
          </div>
        </>
      )}
    </MainDashboard>
  );
};

export default Transfer;
