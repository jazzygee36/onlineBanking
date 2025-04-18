import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='py-12 bg-[#3c1414] text-white'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10'>
        {/* Logo + Description */}
        <div>
          <div className='flex items-center  '>
            <h1 className='text-3xl font-bold text-white  '>TS</h1>
            <h1 className='text-md font-semibold bg-gradient-to-r from-[#d39b16] to-[#d39b16] bg-clip-text text-transparent'>
              -Finance
            </h1>
          </div>
          <p className='mt-4 text-sm text-gray-300'>
            We provide flexible and affordable loan plans tailored to your
            needs. Trust us to support your financial goals with transparency
            and speed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold text-[#d39b16] mb-4'>
            Quick Links
          </h3>
          <ul className='space-y-2 text-sm text-gray-300'>
            <li>
              <a href='#' className='hover:text-[#d39b16] transition-colors'>
                Home
              </a>
            </li>
            <li>
              <Link to='/about'>
                <a className='hover:text-[#d39b16] transition-colors'>
                  About Us
                </a>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <a className='hover:text-[#d39b16] transition-colors'>
                  Our Services
                </a>
              </Link>
            </li>
            <li>
              <Link to='/faq'>
                <a className='hover:text-[#d39b16] transition-colors'>FAQ</a>
              </Link>
            </li>
            <li>
              <a href='#' className='hover:text-[#d39b16] transition-colors'>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className='text-lg font-semibold text-[#d39b16] mb-4'>
            Contact Us
          </h3>
          <ul className='space-y-2 text-sm text-gray-300'>
            <li>Email: support@loanpro.com</li>
            <li>Phone: +1 (800) 123-4567</li>
            <li>Address: 123 Finance Street, NY 10001</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className='w-[90%] mx-auto h-[1px] bg-gray-700 my-8'></div>

      {/* Bottom Note */}
      <div className='text-center text-sm text-gray-400'>
        © {new Date().getFullYear()} LoanPro. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
