import React, { useRef, useState, useEffect, useMemo } from 'react';
import { usePopularMovies } from '../../hooks/useMovies';
import TrendingCard from '../../components/layout/TrendingCard';
import { Link } from 'react-router-dom';

const TrendingNow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    data: originalMovies = [],
    isSuccess,
    isLoading,
    isError,
    error,
  } = usePopularMovies();

  const extendedMovies = useMemo(() => {
    if (originalMovies.length === 0) return [];
    return [
      ...originalMovies.map((m) => ({ ...m, id: `pre-${m.id}` })),
      ...originalMovies,
      ...originalMovies.map((m) => ({ ...m, id: `post-${m.id}` })),
    ];
  }, [originalMovies]);

  const getLayoutMetrics = () => {
    if (!containerRef.current) return { cardWidth: 0, gap: 0 };
    const firstCard = containerRef.current.firstElementChild
      ?.firstElementChild as HTMLElement;
    if (!firstCard) return { cardWidth: 0, gap: 0 };

    const cardWidth = firstCard.offsetWidth;
    const gap = window.innerWidth < 768 ? 16 : 24;
    return { cardWidth, gap };
  };

  useEffect(() => {
    if (isSuccess && containerRef.current && originalMovies.length > 0) {
      const timer = setTimeout(() => {
        const { cardWidth, gap } = getLayoutMetrics();
        const itemSize = cardWidth + gap;
        containerRef.current!.scrollLeft = itemSize * originalMovies.length;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, originalMovies]);

  const handleScrollRight = () => {
    if (isAnimating || !containerRef.current || originalMovies.length === 0)
      return;
    setIsAnimating(true);

    const container = containerRef.current;
    const { cardWidth, gap } = getLayoutMetrics();
    const itemSize = cardWidth + gap;

    container.scrollTo({
      left: container.scrollLeft + itemSize,
      behavior: 'smooth',
    });

    setTimeout(() => {
      const currentScroll = container.scrollLeft;
      const totalOriginalWidth = itemSize * originalMovies.length;
      const maxScroll = totalOriginalWidth * 2;

      if (currentScroll >= maxScroll - 10) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = currentScroll - totalOriginalWidth;
        container.style.scrollBehavior = 'smooth';
      }
      setIsAnimating(false);
    }, 400);
  };

  if (isLoading) {
    return (
      <section className='w-full px-4 sm:px-6 md:px-12 py-6 text-white bg-transparent'>
        <div className='h-7 w-40 bg-gray-800 rounded animate-pulse mb-6' />
        <div className='flex space-x-4 overflow-hidden'>
          {[1, 2].map((n) => (
            <div
              key={n}
              className='flex-none w-[calc(50vw-24px)] sm:w-44 md:w-52 animate-pulse'
            >
              <div className='relative aspect-[3/4] w-full rounded-2xl bg-gray-800 mb-3' />
              <div className='h-4 bg-gray-800 rounded w-3/4 mb-2' />
              <div className='h-3 bg-gray-800 rounded w-1/4' />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='w-full px-4 sm:px-6 md:px-12 py-6 text-white bg-transparent text-center border border-dashed border-gray-800 rounded-2xl my-4'>
        <p className='text-gray-400 font-medium'>
          ⚠️ Feature {error instanceof Error ? error.message : 'Error'}
        </p>
      </section>
    );
  }

  return (
    <section className='w-full px-4 sm:px-6 md:px-12 py-6 relative z-20 text-white bg-transparent overflow-hidden'>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl md:text-2xl font-bold tracking-wide'>
          Trending Now
        </h2>
      </div>

      <div className='relative w-full'>
        <button
          onClick={handleScrollRight}
          className='absolute right-3 top-[110px] sm:top-[130px] md:top-[160px] -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1c1a1c]/60 backdrop-blur-md border border-gray-800/40 hover:bg-black text-white/90 transition flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.7)]'
          aria-label='Scroll Right'
        >
          <svg
            className='w-5 h-5 md:w-6 h-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>

        <div
          ref={containerRef}
          className='w-full overflow-x-auto no-scrollbar flex'
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className='flex space-x-4 md:space-x-6 pb-2'>
            {extendedMovies.map((movie, index) => (
              <Link
                to={`/detail/${movie.id}`}
                key={movie.id}
                className='group relative flex flex-col bg-[#0b0c16] rounded-xl overflow-hidden border border-white/5 transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]'
              >
                <TrendingCard key={`${movie.id}-${index}`} movie={movie} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;
