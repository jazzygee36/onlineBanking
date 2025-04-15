import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import HomeButton from './button';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full py-[14px] px-4 md:px-12 flex items-center justify-between fixed top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[#3c1414]' : 'bg-[#7e501c8c]'
      }`}
    >
      <div className='font-bold text-white text-xl'>Logo</div>

      {/* Desktop nav */}
      <nav className='hidden md:flex gap-6 text-white font-semibold uppercase'>
        <Link
          to='/home'
          className={`hover:text-[#d39b16] ${
            location.pathname === '/home' ? 'text-[#d39b16]' : ''
          }`}
        >
          Home
        </Link>
        <Link
          to='/about'
          className={`hover:text-[#d39b16] ${
            location.pathname === '/about' ? 'text-[#d39b16]' : ''
          }`}
        >
          About
        </Link>
        <Link
          to='/services'
          className={`hover:text-[#d39b16] ${
            location.pathname === '/services' ? 'text-[#d39b16]' : ''
          }`}
        >
          Services
        </Link>
        <Link
          to='/faq'
          className={`hover:text-[#d39b16] ${
            location.pathname === '/faq' ? 'text-[#d39b16]' : ''
          }`}
        >
          FAQ
        </Link>
        {/* <Link to='/contact' className='hover:text-[#d39b16]'>
          Contact
        </Link> */}
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
            className='hover:text-[#d39b16]'
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to='/about'
            className='hover:text-[#d39b16]'
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to='/services'
            className='hover:text-[#d39b16]'
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link to='/faq' className='hover:text-[#d39b16]' onClick={toggleMenu}>
            FAQ
          </Link>
          {/* <Link
            to='/contact'
            className='hover:text-[#d39b16]'
            onClick={toggleMenu}
          >
            Contact
          </Link> */}

          <div className='flex flex-col gap-2 w-[80%] mt-4'>
            <Link to='/login'>
              <HomeButton
                title='Log in'
                type='submit'
                bg='#3c1414'
                width={''}
              />
            </Link>
            <Link to='/register'>
              <HomeButton
                title='Sign up'
                type='submit'
                bg='#d39b16'
                width={''}
              />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
