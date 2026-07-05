import React from 'react';
import { useNewReleases } from '../../hooks/useMovies';
import { type MovieRelease } from '../../types/movie';
import { Link } from 'react-router-dom';

const NewRelease: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNewReleases();

  const allMovies = data ? data.pages.flatMap((page) => page) : [];

  if (isLoading) {
    return (
      <section className='w-full px-4 sm:px-6 md:px-12 py-8 text-white bg-transparent'>
        <div className='h-8 w-48 bg-gray-800 rounded animate-pulse mb-6' />
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className='w-full animate-pulse'>
              <div className='relative aspect-[3/4] w-full rounded-2xl bg-gray-800 mb-2.5' />
              <div className='h-4 bg-gray-800 rounded w-3/4 mb-1' />
              <div className='h-3 bg-gray-800 rounded w-1/4' />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError && allMovies.length === 0) return null;

  return (
    <section className='w-full px-4 sm:px-6 md:px-12 py-8 text-white bg-transparent'>
      <div className='mb-5 md:mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold tracking-wide'>
          New Release
        </h2>
      </div>

      {/* GRID SYSTEM RESPONSIF */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8'>
        {allMovies.map((movie: MovieRelease) => (
          <Link
            to={`/detail/${movie.id.replace('release-', '')}`}
            key={movie.id}
            className='group relative flex flex-col bg-[#0b0c16] rounded-xl overflow-hidden border border-white/5 transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]'
          >
            <div key={movie.id} className='w-full group select-none'>
              <div className='relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#12141c] border border-gray-800/40 mb-2.5 transition transform duration-300 group-hover:scale-[1.02] shadow-md'>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className='w-full h-full object-cover'
                  draggable='false'
                  loading='lazy'
                />
              </div>
              <h3 className='text-sm md:text-base font-bold truncate text-white px-0.5 mb-0.5'>
                {movie.title}
              </h3>
              <div className='flex items-center space-x-1 text-xs text-yellow-500 px-0.5'>
                <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
                  <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                </svg>
                <span className='font-semibold text-gray-400'>
                  {movie.rating}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ACTION TOMBOL LOAD MORE */}
      {hasNextPage && (
        <div className='w-full flex justify-center mt-10 md:mt-12'>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='px-8 py-2.5 rounded-full md:rounded-xl text-xs md:text-sm font-semibold tracking-wide text-white/90 bg-[#10121b]/90 hover:bg-[#1a1d29] border border-gray-800/60 transition-all duration-200 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-sm disabled:opacity-50'
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default NewRelease;
