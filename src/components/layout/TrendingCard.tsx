import React from 'react';
import { type Movie } from '../../types/movie';

interface TrendingCardProps {
  movie: Movie;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ movie }) => {
  return (
    <div className='flex-none w-[calc(50vw-24px)] sm:w-44 md:w-52 select-none'>
      <div className='relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#12141c] border border-gray-800/30 mb-2'>
        <img
          src={movie.image}
          alt={movie.title}
          className='w-full h-full object-cover'
          draggable='false'
          loading='lazy'
        />

        <div className='absolute top-2.5 left-2.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-xs md:text-sm font-bold text-white/90 border border-white/5'>
          {movie.rank}
        </div>
      </div>

      <h3 className='text-sm md:text-base font-bold truncate text-white mb-0.5 px-0.5'>
        {movie.title}
      </h3>

      <div className='flex items-center space-x-1 text-xs text-yellow-500 px-0.5'>
        <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
          <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
        </svg>
        <span className='font-semibold text-gray-400'>{movie.rating}</span>
      </div>
    </div>
  );
};

// Mengunci re-render tidak perlu jika parent bergeser
export default React.memo(TrendingCard);
