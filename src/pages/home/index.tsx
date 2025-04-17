import Banner from '../../components/banner';
import Header from '../../components/header';
import FAQ from './faq';
import AboutUs from './aboutUs';
import Card from './card';
import ChooseUs from './chooseUs';
import HowItWork from './howItWork';
import OurPlans from './ourPlans';
import HomeServices from './services';
import Footer from '../../components/footer';
import ChatBox from '../../components/chatbox';

const HomePage = () => {
  return (
    <div className='w-full h-full'>
      <div className='fixed top-0 left-0 w-full z-10'>
        <Header />
      </div>
      <Banner />
      <Card />
      <AboutUs />
      <HomeServices />
      <HowItWork />
      <ChooseUs />
      <OurPlans />
      <FAQ />
      <Footer />
      <ChatBox />
    </div>
  );
};

export default HomePage;
