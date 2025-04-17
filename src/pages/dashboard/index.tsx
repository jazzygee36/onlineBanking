import { useNavigate } from 'react-router-dom';
import PayBills from '../../assets/svg/bills';
import MyAccount from '../../assets/svg/myAccount';
import Profile from '../../assets/svg/profile';
import Statement from '../../assets/svg/statement';
import Transfer from '../../assets/svg/transfer';
import MainDashboard from '../../components/dashboard';

const Board = [
  { title: 'My Account', icon: MyAccount, path: '/my-account' },
  { title: 'Statement', icon: Statement, path: '/statement' },
  { title: 'Transfer', icon: Transfer, path: '/transfer' },
  { title: 'Bill Paymet', icon: PayBills, path: '/pay-bills' },
  { title: 'Profile', icon: Profile, path: '/profile' },
  // { title: 'Mailling', path: '/mailling' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <MainDashboard title={'Dashbaord'}>
      <div className='flex flex-col items-center justify-center gap-8  h-full'>
        {/* <h4 className='font-semibold underline  text-gray-500 text-center'>
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
              <div className='rounded-full bg-white shadow-md p-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out'>
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
