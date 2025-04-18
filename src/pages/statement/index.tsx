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
    receipt: 'view',
  },
];

const Statement = () => {
  return (
    <MainDashboard title={'Statement'}>
      <h1 className='font-medium mt-6 md:hidden block'>Transaction History</h1>
      <div className='  p-4 my-4 flex items-center justify-between '>
        <div className='w-[50%]'>
          {' '}
          <HomeInput type={'text'} placeholder={'Search...'} />
        </div>
        <div></div>
        {/* <SelectInput option={[]} name={''} /> */}
      </div>
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
                <td className='p-2'>{item.receipt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainDashboard>
  );
};

export default Statement;
