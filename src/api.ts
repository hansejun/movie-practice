const API_KEY = "c95db9f573e7cd21500f6d51e10a748a";
const BASE_URL = "https://api.themoviedb.org/3";

export interface IMoive {
  backdrop_path: string;
  title: string;
  overview: string;
  poster_path: string;
  id: number;
  vote_average: number;
}

export interface IMovieResult {
  dates: { maximum: number; minimum: number };
  page: number;
  results: IMoive[];
  total_pages: number;
  total_results: number;
}

interface IMovieArr {
  [key: string]: () => Promise<IMovieResult>;
}

export const movieFnArr: IMovieArr = {
  movies: getMovies,
  popular: getPopularMovies,
  topRated: getRatedMovies,
  upcoming: getUpcomingMovies,
};

export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getPopularMovies() {
  return fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=2`
  ).then((res) => res.json());
}

export function getRatedMovies() {
  return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getUpcomingMovies() {
  return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
