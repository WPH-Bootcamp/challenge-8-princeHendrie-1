import Navbar from '@/components/layout/Navbar';
import Footer from '../../components/layout/Footer';
const Favorites = () => {
  return (
    <div className='relative min-h-screen bg-black bg-cover bg-center bg-no-repeat flex flex-col justify-between text-white antialiased font-sans'>
      <Navbar />

      <main className='flex-grow flex flex-col justify-between px-6 pt-6 pb-12 md:px-12 md:pt-10 md:pb-24 w-full relative z-10 text-white'>
        {/* JUDUL HALAMAN */}
        <div className='w-full mb-14'>
          <h1 className='text-2xl md:text-3xl font-bold tracking-wide'>
            Favorites
          </h1>
        </div>

        {/* KONTEN UTAMA: DATA EMPTY SECTION */}
        <div className='flex-grow flex flex-col items-center justify-center text-center my-auto px-4'>
          <div className='mb-6 md:mb-8 animate-pulse'>
            <img
              src='../../../../assets/images/cliper.png'
              alt='Data Empty Icon'
              className='w-32 h-32 md:w-40 md:h-40 object-contain mx-auto opacity-80'
            />
          </div>

          {/* Teks Status */}
          <h2 className='text-lg md:text-xl font-semibold tracking-wide mb-2 text-white'>
            Data Empty
          </h2>

          {/* Deskripsi */}
          <p className='text-xs md:text-sm text-gray-400 max-w-xs md:max-w-md mb-8 leading-relaxed'>
            You don't have a favorite movie yet
          </p>

          {/* Tombol Aksi */}
          <button
            onClick={() => navigate('/')} // Arahkan kembali ke Home saat diklik
            className='bg-[#991b1b] hover:bg-red-700 text-white font-semibold text-sm md:text-base px-10 py-3 rounded-full md:rounded-xl transition duration-300 w-full sm:w-auto shadow-lg shadow-red-900/20'
          >
            Explore Movie
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
