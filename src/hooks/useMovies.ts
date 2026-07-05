import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';
import {
  type Movie,
  type MovieRelease,
  type MovieDetail,
} from '../types/movie';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Example: Hook to fetch popular movies
export const usePopularMovies = () => {
  // TODO: Implement useQuery hook
  // Hint: Use movieService.getPopularMovies as queryFn
  return useQuery<Movie[]>({
    queryKey: ['movies', 'popular'],
    queryFn: () => {
      // TODO: Call your movie service function
      //throw new Error('Not implemented');
      return movieService.getPopularMovies(6);
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useNewReleases = () => {
  return useInfiniteQuery<MovieRelease[]>({
    queryKey: ['newReleases'],
    queryFn: ({ pageParam = 1 }) =>
      movieService.getNewReleases(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Jika halaman terakhir mengembalikan data, lanjut ke halaman berikutnya (page + 1)
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useMovieDetail = (movieId: string | undefined) => {
  return useQuery<MovieDetail>({
    queryKey: ['movieDetail', movieId],
    queryFn: () => movieService.getMovieDetail(movieId!),
    enabled: !!movieId, // Query hanya akan berjalan jika movieId tersedia
    staleTime: 1000 * 60 * 15, // Cache bertahan selama 15 menit
  });
};

// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies
