import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useRef } from 'react';
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

// AutoLogout component
const AutoLogout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      logoutUser();
    }, 1 * 60 * 1000); // 5 minutes
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) resetTimer();
    });

    resetTimer();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return null;
};

// PrivateRoute wrapper
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    window.location.href = '/';
    return null;
  }

  return (
    <>
      <AutoLogout />
      {children}
    </>
  );
};

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

        {/* Protected Routes */}
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
