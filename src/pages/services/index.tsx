import Footer from '../../components/footer';
import Header from '../../components/header';
import HomeServices from '../home/services';

const Services = () => {
  return (
    <div>
      <Header />
      <div className='mt-18'>
        <HomeServices />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
