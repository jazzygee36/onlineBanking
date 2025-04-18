import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import HomeButton from './button';

const Header = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = (path: string) =>
    `hover:text-[#d39b16] ${
      location.pathname === path ? 'text-[#d39b16]' : ''
    }`;

  return (
    <header
      className={`w-full py-[14px] px-4 md:px-12 flex items-center justify-between fixed top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[#3c1414]' : 'bg-[#7e501c8c]'
      }`}
    >
      <div className='flex items-center  '>
        <h1 className='text-3xl font-bold text-white  '>TS</h1>
        <h1 className='text-md font-semibold bg-gradient-to-r from-[#d39b16] to-[#d39b16] bg-clip-text text-transparent'>
          -Finance
        </h1>
      </div>

      {/* Desktop nav */}
      <nav className='hidden md:flex gap-6 text-white font-semibold uppercase'>
        <Link to='/home' className={navLinkClasses('/home')}>
          Home
        </Link>
        <Link to='/about' className={navLinkClasses('/about')}>
          About
        </Link>
        <Link to='/services' className={navLinkClasses('/services')}>
          Services
        </Link>
        <Link to='/faq' className={navLinkClasses('/faq')}>
          FAQ
        </Link>
      </nav>

      {/* Desktop buttons */}
      <div className='hidden md:flex gap-4'>
        <Link to='/login'>
          <HomeButton title='Log in' type='submit' bg={'#3c1414'} width={''} />
        </Link>
        <Link to='/register'>
          <HomeButton title='Sign up' type='submit' bg={'#d39b16'} width={''} />
        </Link>
      </div>

      {/* Mobile toggle */}
      <button className='md:hidden text-white' onClick={toggleMenu}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className='absolute top-[72px] left-0 w-full bg-[#3c1414] z-[100] flex flex-col items-center gap-4 py-6 md:hidden text-white font-semibold uppercase transition-all duration-300'>
          <Link
            to='/home'
            className={navLinkClasses('/home')}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to='/about'
            className={navLinkClasses('/about')}
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to='/services'
            className={navLinkClasses('/services')}
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link
            to='/faq'
            className={navLinkClasses('/faq')}
            onClick={toggleMenu}
          >
            FAQ
          </Link>

          <div className='flex flex-col justify-center gap-2 w-[50%] mt-4'>
            <Link to='/login'>
              <HomeButton
                title='Log in'
                type='submit'
                bg='#3c1414'
                width={'100%'}
              />
            </Link>
            <Link to='/register'>
              <HomeButton
                title='Sign up'
                type='submit'
                bg='#d39b16'
                width={'100%'}
              />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
