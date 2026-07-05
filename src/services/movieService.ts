import api from '@/lib/axios';
import {
  type Movie,
  type TMDBMovieResponse,
  type TMDBNewReleaseResponse,
  type MovieRelease,
  type TMDBVideo,
  type MovieDetail,
} from '@/types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const movieService = {
  // TODO: Implement getPopularMovies function
  // Endpoint: GET /movie/popular
  getPopularMovies: async (limit = 6): Promise<Movie[]> => {
    const response = await api.get('/movie/popular', {
      params: { page: 1 },
    });

    //console.log('TESTING', response.data.results);

    return response.data.results
      .slice(0, limit)
      .map((movie: TMDBMovieResponse, index: number) => ({
        id: `movie-${movie.id}`,
        rank: index + 1,
        title: movie.title,
        rating: `${movie.vote_average.toFixed(1)}/10`,
        image: movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : './assets/images/placeholder.png',
        bg_image: movie.backdrop_path
          ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
          : './assets/images/placeholder.png',
      }));
  },
  // TODO: Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing
  getNewReleases: async (page = 1): Promise<MovieRelease[]> => {
    // Menggunakan endpoint /movie/now_playing untuk mendapatkan rilis bioskop/streaming terbaru
    const response = await api.get('/movie/now_playing', {
      params: { page },
    });

    return response.data.results.map((movie: TMDBNewReleaseResponse) => ({
      id: `release-${movie.id}`,
      title: movie.title,
      rating:
        movie.vote_average > 0 ? `${movie.vote_average.toFixed(1)}/10` : 'NR', // NR = Not Rated jika belum ada rating
      image: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : './assets/images/placeholder.png',
    }));
  },

  // TODO: Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}
  getMovieDetail: async (movieId: string): Promise<MovieDetail> => {
    const cleanId = movieId.replace('movie-', '');
    const response = await api.get(`/movie/${cleanId}`);
    return response.data;
  },
  // TODO: Implement searchMovies function
  // Endpoint: GET /search/movie
  // TODO: Add more endpoints as needed

  // TODO: Implement getMovieTrailer function
  // Endpoint: GET /movie/{movie_id}/videos
  getMovieTrailer: async (movieId: string): Promise<string | null> => {
    try {
      const cleanId = movieId.replace('movie-', '');
      const response = await api.get(`/movie/${cleanId}/videos`);

      // Definisikan bahwa variabel videos adalah array dari objek TMDBVideo
      const videos: TMDBVideo[] = response.data.results;

      // Ganti (video: any) menjadi (video: TMDBVideo)
      const trailer = videos.find(
        (video: TMDBVideo) =>
          video.type === 'Trailer' && video.site === 'YouTube'
      );

      return trailer ? trailer.key : null;
    } catch (error) {
      console.error('Gagal mengambil trailer:', error);
      return null;
    }
  },
};
