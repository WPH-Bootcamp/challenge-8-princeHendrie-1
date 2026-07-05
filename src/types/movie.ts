// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

export interface Movie {
  id: string;
  rank: number;
  title: string;
  rating: string;
  image: string;
  bg_image: string;
}

export interface TMDBMovieResponse {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  [key: string]: unknown;
}

export interface TMDBNewReleaseResponse {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

export interface MovieRelease {
  id: string;
  title: string;
  rating: string;
  image: string;
}

export interface TMDBVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string; // Kunci ID video YouTube (misal: dlYClm6V388)
  site: string; // Sumber platform (misal: YouTube)
  size: number;
  type: string; // Tipe video (misal: Trailer, Teaser, Clip)
  official: boolean;
  published_at: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  adult: boolean;
}

// TODO: Add more types as needed (Genre, Video, etc.)
