import Footer from '../../components/footer';
import Header from '../../components/header';
import HomeFAQ from '../home/faq';

const FAQ = () => {
  return (
    <div>
      <Header />

      <div className='mt-[70px]'>
        <HomeFAQ />
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
