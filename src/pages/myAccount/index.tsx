import MainDashboard from '../../components/dashboard';
const Card = [
  {
    label: 'Messages',
    title: '0 New',
  },
  {
    label: '1 Account',
    title: 'Active',
  },
  {
    label: 'Notifications',
    title: '0 New',
  },
  {
    label: 'Transactions',
    title: '0 Pending',
  },
];
const AccountSummary = [
  {
    acctNumber: '003994415280',
    acctType: 'Current Account',
    acctBalance: '$700,000.00',
    acctStatus: 'Active',
  },
];

const MyAccount = () => {
  return (
    <MainDashboard title={'My Account'}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        {Card.map((item, index) => (
          <div
            key={index}
            className='bg-white shadow-sm rounded-lg p-10 flex flex-col items-center justify-center'
          >
            <h2 className='text-md font-medium'>{item.label}</h2>
            <p className='text-sm font-normal text-[#6c757d]'>{item.title}</p>
          </div>
        ))}
      </div>
      <h1 className='font-semibold mt-6'>Account Summary</h1>

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
            {AccountSummary.map((item, index) => (
              <tr key={index}>
                <td className='p-2'>{item.acctNumber}</td>
                <td className='p-2'>{item.acctType}</td>
                <td className='p-2'>{item.acctBalance}</td>
                <td className='p-2'>{item.acctStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className='md:hidden my-4 space-y-4'>
        {AccountSummary.map((item, index) => (
          <div
            key={index}
            className='bg-white shadow rounded-lg p-4 border border-gray-200'
          >
            <div className='mb-2 flex justify-between'>
              <span className='font-medium'>Account Number: </span>
              <span>{item.acctNumber}</span>
            </div>
            <div className='mb-2 flex justify-between'>
              <span className='font-medium'>Account Type: </span>
              <span>{item.acctType}</span>
            </div>
            <div className='mb-2 flex justify-between'>
              <span className='font-medium'>Account Balance: </span>
              <span>{item.acctBalance}</span>
            </div>
            <div className='mb-2 flex justify-between'>
              <span className='font-medium '>Account Status: </span>
              <span>{item.acctStatus}</span>
            </div>
          </div>
        ))}
      </div>
    </MainDashboard>
  );
};

export default MyAccount;
