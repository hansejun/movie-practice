const API_KEY = "c95db9f573e7cd21500f6d51e10a748a";
const BASE_URL = "https://api.themoviedb.org/3";

export interface IMoive {
  backdrop_path: string;
  title: string;
  name: string | null;
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

export interface ITv {
  backdrop_path: string;
  name: string;
  title: string | null;
  overview: string;
  poster_path: string;
  id: number;
  vote_average: number;
}

export interface ITvResult {
  dates: { maximum: number; minimum: number };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

interface ITvArr {
  [key: string]: () => Promise<ITvResult>;
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

export const tvFnArr: ITvArr = {
  tvShows: getTvshows,
  popular: getPopularTvshows,
  topRated: getRatedTvshows,
  today: getTodayTvshows,
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

export function getTvshows() {
  return fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getPopularTvshows() {
  return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getRatedTvshows() {
  return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getTodayTvshows() {
  return fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getTvVideo(tvId: number) {
  return fetch(
    `${BASE_URL}/tv/${tvId}/videos?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}
// data.results[0].key값을 가졍와 watch?v= ${key}를 해주면 경로로 가긴한다.
//https://www.youtube.com/watch?v=_MhaSxMZfDM
