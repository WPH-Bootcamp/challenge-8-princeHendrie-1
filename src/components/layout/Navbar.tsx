import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className='w-full px-6 py-4 md:px-12 md:py-6 flex items-center justify-between relative z-10'>
        {/* Logo & Desktop Navigation */}
        <div className='flex items-center space-x-10'>
          {/* Logo */}
          <a
            href='#'
            className='flex items-center space-x-2 text-xl md:text-2xl font-bold tracking-wide'
          >
            <img
              src='../../../assets/images/bxs_tv.png'
              alt='Movie Logo'
              className='w-6 h-6 md:w-7 md:h-7 object-contain'
            />
            <span>Movie</span>
          </a>

          {/* Desktop Menu */}
          <nav className='hidden md:flex space-x-8 text-sm font-medium text-gray-300'>
            <Link to='/' className='hover:text-white transition'>
              Home
            </Link>
            <Link to='/favorites' className='hover:text-white transition'>
              Favorites
            </Link>
          </nav>
        </div>

        {/* Right Side: Search & Mobile Menu */}
        <div className='flex items-center space-x-4'>
          {/* Search Bar */}
          <div className='relative'>
            {/* Desktop Input */}
            <div className='hidden md:flex items-center bg-[#1e2230]/80 border border-gray-700/50 rounded-xl px-4 py-2 w-64 focus-within:border-gray-500 transition'>
              <svg
                className='w-4 h-4 text-gray-400 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
              <input
                type='text'
                placeholder='Search Movie'
                className='bg-transparent text-sm w-full focus:outline-none text-gray-200 placeholder-gray-400'
              />
            </div>

            {/* Mobile Search Icon */}
            <button className='block md:hidden text-white p-1 hover:text-gray-300'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile Hamburger Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className='block md:hidden text-white p-1 hover:text-gray-300'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY (Aktif saat hamburger diklik) */}
      {isMenuOpen && (
        <div className='fixed inset-0 bg-black z-50 flex flex-col md:hidden animate-fade-in'>
          {/* Top Bar inside Overlay */}
          <div className='w-full px-6 py-4 flex items-center justify-between'>
            <div className='flex items-center space-x-2 text-xl font-bold tracking-wide text-white'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M21 6h-7.59l3.29-3.29a1 1 0 0 0-1.42-1.42L11.59 5H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 13H3V7h18v12z' />
              </svg>
              <span>Movie</span>
            </div>

            {/* Close Button 'X' */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className='text-white p-1 hover:text-gray-300'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <nav className='flex flex-col space-y-8 px-8 mt-12 text-lg font-medium tracking-wide'>
            <Link
              to='/'
              onClick={() => setIsMenuOpen(false)} // Tutup menu setelah diklik
              className='text-white border-b border-transparent hover:border-white w-max transition'
            >
              Home
            </Link>
            <Link
              to='/favorites'
              onClick={() => setIsMenuOpen(false)} // Tutup menu setelah diklik
              className='text-gray-400 hover:text-white transition w-max'
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
