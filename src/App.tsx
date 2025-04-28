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
import Statement from './pages/statement';
import Profile from './pages/profile';
import PayBill from './pages/payBill';
import TransferFund from './pages/transfer';

const App = () => {
  // PrivateRoute component
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? <>{children}</> : (window.location.href = '/');
  };
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
        {/* PROTECTED ROUTES */}
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/my-account'
          element={
            <PrivateRoute>
              <MyAccount />
            </PrivateRoute>
          }
        />
        <Route
          path='/transfer'
          element={
            <PrivateRoute>
              <TransferFund />
            </PrivateRoute>
          }
        />
        <Route
          path='/statement'
          element={
            <PrivateRoute>
              <Statement />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/pay-bills'
          element={
            <PrivateRoute>
              <PayBill />
            </PrivateRoute>
          }
        />
        {/* <Route path='/dashboard' element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
