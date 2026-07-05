import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='w-full bg-black border-t border-gray-900/50 px-6 py-6 md:px-12 md:py-8 relative z-10'>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0'>
        {/* LOGO SECTION */}
        <div className='flex items-center space-x-2 text-xl font-bold tracking-wide text-white'>
          <img
            src='../../../assets/images/bxs_tv.png'
            alt='Movie Logo'
            className='w-6 h-6 object-contain'
          />
          <span>Movie</span>
        </div>

        {/* COPYRIGHT TEXT SECTION */}
        <div className='text-xs md:text-sm text-gray-500 font-normal'>
          Copyright ©2025 Movie Explorer
        </div>
      </div>
    </footer>
  );
};

export default Footer;
