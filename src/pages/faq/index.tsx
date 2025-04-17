import Footer from '../../components/footer';
import Header from '../../components/header';
import HomeFAQ from '../home/faq';

const FAQ = () => {
  return (
    <div>
      <Header />

      <img
        src={`https://zenus.com/media/xcxlbzi1/3-website-banner-2000-x-850-px-3.png?width=1000&height=300&format=webp&quality=90&rnd=133857458137430000`}
        alt='about'
        className='w-full'
      />
      <HomeFAQ />

      <Footer />
    </div>
  );
};

export default FAQ;
