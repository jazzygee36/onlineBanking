import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // or useRouter for Next.js

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const AutoLogout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate(); // For redirecting after logout

  const logoutUser = () => {
    localStorage.removeItem('token'); // or however you store auth
    // other cleanup logic here
    navigate('/login');
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      logoutUser();
    }, 5 * 60 * 1000); // 5 minutes
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) resetTimer(); // reset on tab active again
    });

    resetTimer(); // start timer on mount

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return null;
};

export default AutoLogout;
