import MainDashboard from '../../components/dashboard';
import HomeInput from '../../components/input';
// import SelectInput from '../../components/selectInput';

const AccountSummary = [
  {
    id: '1',
    beneficiary: 'Jimmy',
    acctNumber: '003994415280',
    bankName: 'First Bank',
    acctType: 'Current Account',
    amount: '$700,000.00',
    acctStatus: 'Complete',
    date: '2025-04-01 14:55:04',
    receipt: 'View',
  },
];

const Statement = () => {
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

      {/* Desktop Table */}
      <div className='hidden md:block w-full overflow-x-auto mt-4 rounded-lg border border-none'>
        <table className='min-w-[600px] w-full'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='p-2 font-medium text-left'>S/N</th>
              <th className='p-2 font-medium text-left'>Beneficiary</th>
              <th className='p-2 font-medium text-left'>Account number</th>
              <th className='p-2 font-medium text-left'>Bank name</th>
              <th className='p-2 font-medium text-left'>Amount</th>
              <th className='p-2 font-medium text-left'>Status</th>
              <th className='p-2 font-medium text-left'>Date</th>
              <th className='p-2 font-medium text-left'>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {AccountSummary.map((item, index) => (
              <tr key={index}>
                <td className='p-2'>{item.id}</td>
                <td className='p-2'>{item.beneficiary}</td>
                <td className='p-2'>{item.acctNumber}</td>
                <td className='p-2'>{item.bankName}</td>
                <td className='p-2'>{item.amount}</td>
                <td className='p-2'>{item.acctStatus}</td>
                <td className='p-2'>{item.date}</td>
                <td className='p-2 text-blue-600 underline cursor-pointer'>
                  {item.receipt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className='block md:hidden space-y-4 h-[100%]'>
        {AccountSummary.map((item, index) => (
          <div
            key={index}
            className='bg-white rounded-lg shadow p-4  border border-gray-200'
          >
            <div className='flex justify-between items-center mb-2'>
              <h2 className='font-normal text-md'>Beneficiary</h2>
              <h2 className='font-medium text-md'>{item.beneficiary}</h2>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <span className='font-normal'>Account Number:</span>{' '}
              <span className='font-medium'>{item.acctNumber}</span>{' '}
            </div>
            <div className='flex justify-between items-center mb-2'>
              <span className='font-normal'>Bank:</span>{' '}
              <span className='font-medium'>{item.bankName}</span>{' '}
            </div>

            <div className='flex justify-between items-center mb-2'>
              <span className='font-normal'>Amount:</span>{' '}
              <span className='font-medium'>{item.amount}</span>{' '}
            </div>

            <div className='flex justify-between items-center mb-2'>
              <span className='font-normal'>Date:</span>{' '}
              <span className='font-medium'>{item.date}</span>{' '}
            </div>

            <div className='flex justify-between items-center mb-2'>
              <span className='font-normal'>Status:</span>{' '}
              <span className='font-medium'>{item.acctStatus}</span>{' '}
            </div>

            <div className='flex justify-between items-center mb-2'>
              <p></p>
              <p className='text-sm text-blue-600 underline cursor-pointer  float-right'>
                {item.receipt}
              </p>
            </div>

            <div> </div>
          </div>
        ))}
      </div>
    </MainDashboard>
  );
};

export default Statement;
