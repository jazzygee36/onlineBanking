import { useEffect, useState } from 'react';
import Bell from '../../assets/svg/bell';
import Mail from '../../assets/svg/mail';
import MyAccountIcon from '../../assets/svg/myAccount';
import Transfer from '../../assets/svg/transfer';
import MainDashboard from '../../components/dashboard';
import axios from 'axios';

const Card = [
  {
    label: 'Messages',
    title: '0 New',
    icon: <Mail />,
  },
  {
    label: '1 Account',
    title: 'Active',
    icon: <MyAccountIcon />,
  },
  {
    label: 'Notifications',
    title: '0 New',
    icon: <Bell />,
  },
  {
    label: 'Transactions',
    title: '0 Pending',
    icon: <Transfer />,
  },
];

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

const MyAccount = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [allStatements, setAllStatements] = useState<Statement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleAllStatements = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/all-statements`
        );
        setAllStatements(res.data);
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        setLoading(false);
      }
    };
    handleAllStatements();
  }, []);

  const completedTotal = allStatements
    .filter((statement) => statement.status === 'Completed')
    .reduce((sum, statement) => sum + parseFloat(statement.amount), 0);

  return (
    <MainDashboard title={'My Account'}>
      <h1 className='font-medium my-6 md:hidden block'>Account details</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        {Card.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-center bg-white shadow-sm rounded-lg p-10 gap-3'
          >
            <div className='bg-[#f8f9fa]  rounded-lg'>{item.icon}</div>
            <div className=' flex flex-col items-center justify-center'>
              <h2 className='text-md font-medium'>{item.label}</h2>
              <p className='text-sm font-normal text-[#6c757d]'>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <h1 className='font-semibold mt-6'>Account Summary</h1>

      {loading ? (
        <div className='flex items-center justify-center py-10 text-gray-500'>
          Loading account info...
        </div>
      ) : (
        <>
          {/* Table for md and up */}
          <div className='hidden md:block w-full overflow-x-auto mt-4 rounded-lg border border-none'>
            <table className='min-w-[600px] w-full'>
              <thead className='bg-gray-200'>
                <tr>
                  <th className='p-2 font-medium text-left'>Account Number</th>
                  <th className='p-2 font-medium text-left'>Account Type</th>
                  <th className='p-2 font-medium text-left'>Account Balance</th>
                  <th className='p-2 font-medium text-left'>Account Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2'>{user.acctNumber}</td>
                  <td className='p-2'>{user.acctType}</td>
                  <td className='p-2'>${completedTotal.toLocaleString()}</td>
                  <td className='p-2'>{user.active}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Card layout for small screens */}
          <div className='md:hidden my-4 space-y-4'>
            <div className='bg-white shadow rounded-lg p-4 border border-gray-200'>
              <div className='mb-2 flex justify-between'>
                <span className='font-medium'>Account Number: </span>
                <span>{user.acctNumber}</span>
              </div>
              <div className='mb-2 flex justify-between'>
                <span className='font-medium'>Account Type: </span>
                <span>{user.acctType}</span>
              </div>
              <div className='mb-2 flex justify-between'>
                <span className='font-medium'>Account Balance: </span>
                <span>${completedTotal.toLocaleString()}</span>
              </div>
              <div className='mb-2 flex justify-between'>
                <span className='font-medium '>Account Status: </span>
                <span>{user.acctStatus}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </MainDashboard>
  );
};

export default MyAccount;
