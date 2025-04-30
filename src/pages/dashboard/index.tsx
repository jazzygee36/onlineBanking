import { useNavigate } from 'react-router-dom';
import PayBills from '../../assets/svg/bills';
import MyAccount from '../../assets/svg/myAccount';
import Profile from '../../assets/svg/profile';
import Statement from '../../assets/svg/statement';
import Transfer from '../../assets/svg/transfer';
import MainDashboard from '../../components/dashboard';
import Mail from '../../assets/svg/mail';

const Board = [
  { title: 'My Account', icon: MyAccount, path: '/my-account' },
  { title: 'Statement', icon: Statement, path: '/statement' },
  { title: 'Transfer', icon: Transfer, path: '/transfer' },
  { title: 'Bill Paymet', icon: PayBills, path: '/pay-bills' },
  { title: 'Profile', icon: Profile, path: '/profile' },
  // { title: 'Mailling', path: '/mailling' },
];

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const Card = [
    {
      label: 'Account Number',
      title: user?.acctNumber,
      icon: <Mail />,
    },
    {
      label: 'Account Type',
      title: user?.acctType,
      icon: <Mail />,
    },
    {
      label: 'Account Status',
      title: user?.active,
      icon: <Mail />,
    },
  ];
  const navigate = useNavigate();
  return (
    <MainDashboard title={'Dashbaord'}>
      <h1 className='font-medium my-6 md:hidden block'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-4 mx-4 md:mx-8'>
        {Card.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-center bg-white shadow-sm rounded-lg p-10 gap-3'
          >
            {/* <div className='bg-[#f8f9fa]  rounded-lg'>{item.icon}</div> */}
            <div className=' flex flex-col items-center justify-center gap-3'>
              <h2 className='text-md font-medium'>{item?.label}</h2>
              <p className='text-sm font-normal text-[#6c757d]'>
                {item?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col items-center mt-8 gap-8  h-full'>
        {/* <h4 className='font-semibold underline  text-gray-500 text-center md:hidden sm:block'>
          Navigate with the icons below.
        </h4> */}

        <div className='grid md:grid-cols-3 grid-cols-2 gap-16 '>
          {Board.map((board, index) => (
            <div
              key={index}
              className=''
              onClick={() => {
                navigate(board.path);
              }}
            >
              <div className='rounded-full bg-white shadow-sm shadow-amber-600 p-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out'>
                {board.icon && <board.icon />}
              </div>
              <h1 className='text-center'>{board.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </MainDashboard>
  );
};

export default Dashboard;
