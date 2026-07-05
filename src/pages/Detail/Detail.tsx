import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TrailerModal from '../../components/layout/TrailerModal';
import { movieService } from '../../services/movieService';
import { useMovieDetail } from '../../hooks/useMovies';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: movie, isLoading, isError } = useMovieDetail(id);

  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isTrailerLoading, setIsTrailerLoading] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const IMAGE_BASE_URL =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL ||
    'https://image.tmdb.org/t/p/w500';

  const handleWatchTrailer = async () => {
    if (!id) return;
    setIsTrailerLoading(true);
    const key = await movieService.getMovieTrailer(id);
    setIsTrailerLoading(false);

    if (key) {
      setTrailerKey(key);
    } else {
      alert('Maaf, video trailer resmi tidak tersedia untuk film ini.');
    }
  };

  const formatReleaseDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#020205] text-white flex items-center justify-center'>
        <div className='animate-pulse flex flex-col items-center space-y-4'>
          <div className='w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin' />
          <p className='text-gray-400 text-sm'>Memuat informasi film...</p>
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className='min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center p-6'>
        <h2 className='text-2xl font-bold mb-2'>Gagal Memuat Film</h2>
        <p className='text-gray-400 text-sm mb-6 text-center'>
          Data film tidak ditemukan atau koneksi API terputus.
        </p>
        <button
          onClick={() => navigate('/')}
          className='bg-red-700 px-6 py-2.5 rounded-xl font-semibold'
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL.replace('/w500', '/original')}${movie.backdrop_path}`
    : '';
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : '';

  return (
    <div className='relative min-h-screen bg-[#020205] text-white antialiased flex flex-col justify-between overflow-x-hidden'>
      {/* HERO BANNER BACKGROUND */}
      <div
        className='absolute top-0 left-0 w-full h-[40vh] sm:h-[50vh] md:h-[85vh] bg-cover bg-center bg-no-repeat z-0'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(2, 2, 5, 0.1) 0%, rgba(2, 2, 5, 0.4) 40%, rgba(2, 2, 5, 0.85) 75%, rgba(2, 2, 5, 1) 100%), url(${backdropUrl})`,
        }}
      />

      <Navbar />

      {/* MAIN CONTAINER */}
      <main className='relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-[14vh] sm:pt-[18vh] md:pt-[42vh] pb-16'>
        {/* RESPONSIVE GRID ENGINE */}
        <div className='flex flex-col md:grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] md:gap-x-10 lg:gap-x-12 items-center'>
          {/* ATAS: POSTER & JUDUL BERSISIAN DI MOBILE */}
          <div className='flex flex-row items-end gap-4 w-full mb-6 md:mb-0 md:block md:col-start-1 md:row-start-1'>
            {/* Poster Img */}
            <div className='w-[110px] sm:w-[140px] md:w-full flex-shrink-0'>
              <div className='relative aspect-[3/4] w-full rounded-xl md:rounded-2xl overflow-hidden bg-[#12141c] border border-white/10 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.9)]'>
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className='w-full h-full object-cover'
                  draggable='false'
                />
              </div>
            </div>

            {/* Judul Film (Mobile Only) */}
            <div className='block md:hidden flex-grow text-left pb-1'>
              <h1 className='text-base sm:text-xl font-bold tracking-tight text-white leading-snug mb-1'>
                {movie.title}
              </h1>
              <div className='flex items-center space-x-1 text-[11px] text-gray-400 font-medium'>
                <svg
                  className='w-3.5 h-3.5 flex-shrink-0'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <span>{formatReleaseDate(movie.release_date)}</span>
              </div>
            </div>
          </div>

          {/* BAWAH: BLOK INFORMASI LANJUTAN */}
          <div className='md:col-start-2 md:row-start-1 flex flex-col justify-center text-left w-full'>
            {/* Judul Film (Desktop Only) */}
            <div className='hidden md:block'>
              <h1 className='text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] leading-tight mb-3'>
                {movie.title}
              </h1>
              <div className='flex items-center space-x-2 text-sm text-gray-300 font-medium opacity-80 mb-6'>
                <svg
                  className='w-4 h-4 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <span>{formatReleaseDate(movie.release_date)}</span>
              </div>
            </div>

            {/* Tombol Watch Trailer & Favorit */}
            <div className='flex items-center space-x-3 mb-6 w-full md:w-auto'>
              <button
                onClick={handleWatchTrailer}
                disabled={isTrailerLoading}
                className='flex-grow md:flex-grow-0 flex items-center justify-center space-x-2 bg-[#901306] hover:bg-red-700 disabled:bg-red-950 text-white text-xs sm:text-sm font-bold px-6 md:px-8 py-3.5 rounded-full transition shadow-xl active:scale-95 whitespace-nowrap'
              >
                <span>{isTrailerLoading ? 'Loading...' : 'Watch Trailer'}</span>
                <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                  <path d='M8 5v14l11-7z' />
                </svg>
              </button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className='flex-shrink-0 flex items-center justify-center p-3.5 rounded-full bg-[#08090f]/90 hover:bg-[#121420] text-white border border-gray-800/80 transition shadow-xl active:scale-95 backdrop-blur-sm'
              >
                <svg
                  className={`w-5 h-5 transition-colors duration-200 ${isFavorite ? 'text-red-600 fill-current' : 'text-gray-400'}`}
                  fill={isFavorite ? 'currentColor' : 'none'}
                  stroke='currentColor'
                  strokeWidth='2.5'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </button>
            </div>

            <div className='grid grid-cols-3 gap-2 md:gap-4 w-full max-w-2xl'>
              {/* Rating */}
              <div className='bg-[#030307]/60 border border-gray-900 rounded-xl md:rounded-2xl p-2 md:p-5 flex flex-col items-center justify-center text-center min-h-[75px] sm:min-h-[85px] md:min-h-[110px]'>
                <svg
                  className='w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-current mb-0.5 md:mb-1'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                </svg>
                <span className='text-[9px] md:text-xs text-gray-500 font-bold uppercase tracking-wider'>
                  Rating
                </span>
                <span className='text-[11px] sm:text-xs md:text-base font-extrabold text-white mt-0.5'>
                  {movie.vote_average
                    ? `${movie.vote_average.toFixed(1)}/10`
                    : '6.2/10'}
                </span>
              </div>

              {/* Genre */}
              <div className='bg-[#030307]/60 border border-gray-900 rounded-xl md:rounded-2xl p-2 md:p-5 flex flex-col items-center justify-center text-center min-h-[75px] sm:min-h-[85px] md:min-h-[110px]'>
                <svg
                  className='w-4 h-4 md:w-5 md:h-5 text-gray-400 mb-0.5 md:mb-1'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                  />
                </svg>
                <span className='text-[9px] md:text-xs text-gray-500 font-bold uppercase tracking-wider'>
                  Genre
                </span>
                <span className='text-[11px] sm:text-xs md:text-base font-extrabold text-white mt-0.5 truncate max-w-full px-1'>
                  {movie.genres && movie.genres.length > 0
                    ? movie.genres[0].name
                    : 'Action'}
                </span>
              </div>

              {/* Age Limit */}
              <div className='bg-[#030307]/60 border border-gray-900 rounded-xl md:rounded-2xl p-2 md:p-5 flex flex-col items-center justify-center text-center min-h-[75px] sm:min-h-[85px] md:min-h-[110px]'>
                <svg
                  className='w-4 h-4 md:w-5 md:h-5 text-gray-400 mb-0.5 md:mb-1'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span className='text-[9px] md:text-xs text-gray-500 font-bold uppercase tracking-wider'>
                  Age Limit
                </span>
                <span className='text-[11px] sm:text-xs md:text-base font-extrabold text-white mt-0.5'>
                  {movie.adult ? '18' : '13'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SINOPSIS OVERVIEW */}
        <div className='w-full text-left border-t border-white/5 pt-6 mt-8'>
          <h2 className='text-lg md:text-2xl font-bold mb-2 tracking-wide text-white'>
            Overview
          </h2>
          <p className='text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed max-w-5xl opacity-85 font-normal'>
            {movie.overview || 'Sinopsis tidak tersedia dalam bahasa ini.'}
          </p>
        </div>
      </main>

      <Footer />

      {trailerKey && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setTrailerKey(null)}
        />
      )}
    </div>
  );
};

export default Detail;
