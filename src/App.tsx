import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Services from './pages/services';
import FAQ from './pages/faq';
import Login from './pages/login';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';
import MyAccount from './pages/myAccount';
import Transfer from './pages/transfer';
import Statement from './pages/statement';
import Profile from './pages/profile';
import PayBill from './pages/payBill';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/my-account' element={<MyAccount />} />
        <Route path='/transfer' element={<Transfer />} />
        <Route path='/statement' element={<Statement />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/pay-bills' element={<PayBill />} />
        {/* <Route path='/dashboard' element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
