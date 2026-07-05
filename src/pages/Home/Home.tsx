import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TrandingNow from '../../pages/TrendingNow/TrendingNow';
import NewRelease from '../NewRelease/NewRelease';
import { usePopularMovies } from '../../hooks/useMovies';
import { movieService } from '../../services/movieService';
import TrailerModal from '../../components/layout/TrailerModal';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data: movies = [], isLoading, isError } = usePopularMovies();
  const heroMovie = movies.length > 0 ? movies[0] : null;

  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);

  const handleWatchTrailer = async () => {
    if (!heroMovie) return;

    setIsTrailerLoading(true);
    // Memanggil API berdasarkan ID film utama
    const key = await movieService.getMovieTrailer(heroMovie.id);
    setIsTrailerLoading(false);

    if (key) {
      setTrailerKey(key);
    } else {
      alert('Maaf, video trailer tidak tersedia untuk film ini.');
    }
  };

  const handleSeeDetail = () => {
    if (!heroMovie) return;

    const cleanId = heroMovie.id.replace('movie-', '');
    navigate(`/detail/${cleanId}`);
  };

  const backdropUrl = heroMovie
    ? heroMovie.bg_image.replace('/w500/', '/original/')
    : '';

  return (
    <div className='relative min-h-screen bg-[#020205] text-white antialiased font-sans flex flex-col justify-between overflow-x-hidden'>
      {/* BACKGROUND BANNER HERO */}
      {heroMovie && (
        <div
          className='absolute top-0 left-0 w-full h-[85vh] md:h-screen bg-cover bg-center bg-no-repeat z-0 transition-all duration-700 animate-fade-in'
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(2, 2, 5, 1) 100%), url(${backdropUrl})`,
          }}
        />
      )}

      <Navbar />

      {/* MAIN HERO CONTENT */}
      <main className='relative z-10 flex-grow flex flex-col justify-end px-4 sm:px-6 md:px-12 pt-[40vh] pb-8 md:pb-16 max-w-3xl w-full'>
        {isLoading ? (
          <div className='animate-pulse space-y-4'>
            <div className='h-10 bg-gray-800 rounded w-2/3' />
            <div className='h-4 bg-gray-800 rounded w-full' />
            <div className='h-4 bg-gray-800 rounded w-5/6' />
            <div className='h-12 bg-gray-800 rounded w-44 mt-6' />
          </div>
        ) : isError || !heroMovie ? (
          <div className='py-10 text-gray-400'>
            <h1 className='text-3xl font-bold mb-2 text-white'>
              Welcome to MovieApp
            </h1>
            <p className='text-sm'>Gagal memuat detail film utama saat ini.</p>
          </div>
        ) : (
          <>
            <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-white drop-shadow-md'>
              {heroMovie.title}
            </h1>

            <div className='flex items-center space-x-2 mb-4 text-xs md:text-sm font-semibold text-yellow-500'>
              <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
              </svg>
              <span>{heroMovie.rating} Rating</span>
            </div>

            <p className='text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mb-6 opacity-90 drop-shadow-sm'>
              Now trending at Rank #{heroMovie.rank} on our platform. Dive into
              the breathtaking story of {heroMovie.title} and stream the
              cinematic global release immediately.
            </p>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
              {/* 5. PASANG EVENT HANDLER & STATE DISABLED DI SINI */}
              <button
                onClick={handleWatchTrailer}
                disabled={isTrailerLoading}
                className='flex items-center justify-center space-x-2 bg-[#991b1b] hover:bg-red-700 disabled:bg-red-900/80 text-white font-semibold px-6 py-3.5 rounded-full md:rounded-xl transition w-full sm:w-auto shadow-lg'
              >
                <span>
                  {isTrailerLoading ? 'Loading Trailer...' : 'Watch Trailer'}
                </span>
                {!isTrailerLoading && (
                  <img
                    src='../../../assets/images/Play.png'
                    alt='Play Icon'
                    className='w-5 h-5 md:w-6 md:h-6 object-contain'
                  />
                )}
              </button>

              <button
                onClick={handleSeeDetail}
                className='flex items-center justify-center bg-[#0f111a]/80 hover:bg-[#1a1d29] text-white font-semibold px-8 py-3.5 rounded-full md:rounded-xl border border-gray-800/80 transition w-full sm:w-auto shadow-lg backdrop-blur-sm'
              >
                See Detail
              </button>
            </div>
          </>
        )}
      </main>

      <div className='relative z-10 w-full bg-[#020205] flex flex-col space-y-4'>
        <TrandingNow />
        <NewRelease />
      </div>

      <Footer />

      {/* 6. TAMPILKAN MODAL SECARA KONDISIONAL JIKA TRAILER_KEY TERSEDIA */}
      {trailerKey && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setTrailerKey(null)}
        />
      )}
    </div>
  );
};

export default Home;
