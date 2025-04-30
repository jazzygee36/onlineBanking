import { useEffect, useState } from 'react';
import MainDashboard from '../../components/dashboard';
import HomeInput from '../../components/input';
import axios from 'axios';
// import SelectInput from '../../components/selectInput';

const Statement = () => {
  interface Statement {
    updatedAt: string;
    id: string;
    beneficiary: string;
    senderAcctNumber: string;
    senderBank: string;
    acctType: string;
    amount: string;
    status: string;
    date: string;
    receipt: string;
  }
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [allStatements, setAllStatements] = useState<Statement[]>([]);
  console.log('allStatements', allStatements);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const handleAllStatements = async () => {
      const userId = user.id;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/${userId}/statements`
        );
        setAllStatements(res.data);
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        setLoading(false); // Stop loading after request completes
      }
    };
    handleAllStatements();
  }, []);

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <MainDashboard title={'Statement'}>
      <h1 className='font-medium mt-6 md:hidden block'>Transaction History</h1>

      <div className='my-4 flex items-center justify-between'>
        <div className='w-full md:w-[50%]'>
          <HomeInput type={'text'} placeholder={'Search...'} />
        </div>
        <div></div>
        {/* <SelectInput option={[]} name={''} /> */}
      </div>

      {loading ? (
        <div className='flex justify-center items-center py-20'>
          <div className='animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid'></div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className='hidden md:block w-full overflow-x-auto mt-4 rounded-lg border border-none'>
            <table className='min-w-[600px] w-full'>
              <thead className='bg-gray-200'>
                <tr>
                  <th className='p-2 font-medium text-left'>Beneficiary</th>
                  <th className='p-2 font-medium text-left'>Account number</th>
                  <th className='p-2 font-medium text-left'>Bank name</th>
                  <th className='p-2 font-medium text-left'>Amount</th>
                  <th className='p-2 font-medium text-left'>Status</th>
                  <th className='p-2 font-medium text-left'>Date</th>
                </tr>
              </thead>
              <tbody>
                {allStatements.map((statement, index) => (
                  <tr key={index}>
                    <td className='p-2'>{statement.beneficiary}</td>
                    <td className='p-2'>{statement.senderAcctNumber}</td>
                    <td className='p-2'>{statement.senderBank}</td>
                    <td className='p-2'>{statement.amount.toLocaleString()}</td>
                    <td className='p-2'>{statement.status}</td>
                    <td className='p-2'>
                      {formatDateTime(statement.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className='block md:hidden space-y-4 h-[100%]'>
            {allStatements.map((statement, index) => (
              <div
                key={index}
                className='bg-white rounded-lg shadow p-4 border border-gray-200'
              >
                <div className='flex justify-between items-center mb-2'>
                  <h2 className='font-normal text-md'>Beneficiary</h2>
                  <h2 className='font-medium text-md'>
                    {statement.beneficiary}
                  </h2>
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-normal'>Account Number:</span>
                  <span className='font-medium'>
                    {statement.senderAcctNumber}
                  </span>
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-normal'>Bank:</span>
                  <span className='font-medium'>{statement.senderBank}</span>
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-normal'>Amount:</span>
                  <span className='font-medium'>
                    {statement.amount.toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-normal'>Date:</span>
                  <span className='font-medium'>
                    {formatDateTime(statement.updatedAt)}
                  </span>
                </div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-normal'>Status:</span>
                  <span className='font-medium'>{statement.status}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </MainDashboard>
  );
};

export default Statement;
