import { IPaginationResult } from './pagination';

// export interface IMovie<T> extends IPagination<T>{
//   page: number
//   results: T[],
//   total_results: number
// }

interface IMovieBase {
  id: number
}

export interface IMovieResult extends IMovieBase{
  adult: boolean,
  genre_ids: number[],

  original_language: string,
  original_title: string,
  overview: string,
  poster_path: string,
  release_date: string,
  title: string,
  vote_average: string,
  vote_count: string,
  backdrop_path: string
}


export interface IMovieDetails extends IMovieBase{
  backdrop_path: string | null,
  poster_path: string | null,
  genres: IMovieGenre[],
  original_title: string,
  overview: string,
  title: string,
  vote_average: number,
  vote_count: number,
  imdb_id: number,
  release_date: string,
  runtime: number | null
}

interface IMovieGenre extends IMovieBase{
  name: string
}

export interface IMovieRecommendation extends IMovieBase{
  poster_path: string,
  adult: boolean,
  overview: string,
  release_date: string,
  genre_ids: number[],
  original_title: string,
  original_language: string,
  title: string,
  backdrop_path: string,
  popularity: number,
  vote_average: number
}


export  interface IMovieItem {
  id: number,
  name: string,
}
