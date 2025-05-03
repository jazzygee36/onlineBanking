import MainDashboard from '../../components/dashboard';
import Icon from '../../assets/loan.png';
import Credit from '../../assets/credit.png';
import Scholarships from '../../assets/fees.png';
import Bills from '../../assets/bill.png';

const ImageIcon = [
  {
    icon: Credit,
    title: 'Get our credit card',
  },
  {
    icon: Icon,
    title: 'Get your loans approved',
  },

  {
    icon: Bills,
    title: 'Pay bills',
  },

  {
    icon: Scholarships,
    title: 'Apply for scholarships',
  },
];

const PayBill = () => {
  return (
    <MainDashboard title={'Pay Bills'}>
      <h1 className='font-medium mt-6'>Pay bills online</h1>

      <div className='grid grid-cols-2 m-auto mt-8 justify-center gap-12 sm:w-1/2 md:w-full'>
        {ImageIcon.map((bill, index) => (
          <div key={index} className='grid justify-center cursor-pointer'>
            <img src={bill.icon} />
            {bill.title}
          </div>
        ))}
      </div>
    </MainDashboard>
  );
};

export default PayBill;
