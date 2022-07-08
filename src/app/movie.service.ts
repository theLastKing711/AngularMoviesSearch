import { IPaginationResult } from './../types/pagination';
import { IMovieResult, IMovieDetails, IMovieRecommendation } from './../types/movie';
import { environment } from './../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }


  // private transofrmToMovie(movie: IMovie):

  private dummy_image = "https://via.placeholder.com/150";

  private hasBackdrop<T extends {backdrop_path: string} >(movie: T): boolean {
    return movie.backdrop_path !== null
  }

  private hasPosterPath<T extends {poster_path: string} >(movie: T): boolean {

    return movie.poster_path !== null
  }


  private mapMoviePathImages<T extends {poster_path: string}>(movies: T[]): T[] {
    const images_url = environment.images_url;

    return movies.map(movie => ({...movie,
        poster_path:  this.hasPosterPath(movie) ? (images_url + movie.poster_path) : this.dummy_image })
  )}

  private mapMovieBackdrop<T extends {backdrop_path: string}>(movies: T[]): T[] {
    const images_url = environment.images_url;

    return movies.map(movie => ({...movie,
        backdrop_path:  this.hasBackdrop(movie) ? (images_url + movie.backdrop_path) : this.dummy_image })
  )}



  getMovies(pageNumber?: number) {

    const moviesUrl = environment.app_url + "movie/popular"
    const page = pageNumber ?? 1;

    let httpParams = new HttpParams();

    const params = httpParams.set('api_key', environment.api_key)
                             .set('language', 'en-US')
                             .set('page', page)


    return this.httpClient.get<IPaginationResult<IMovieResult>>(moviesUrl, {params: params}).pipe(
      tap(movies => console.log("movies", movies)),
      map(movie => ({movies: this.mapMoviePathImages(movie.results), page: movie.page, total_movies: movie.total_results})),
      )
  }


  getMovie(id: number) {
    const movieUrl = `${environment.app_url}movie/${id}`;

    let httpParams = new HttpParams();

    const params = httpParams.set('api_key', environment.api_key)
                             .set('language', 'en-US')

    let movieDetails = this.httpClient.get<IMovieDetails>(movieUrl, {params: params})
                          .pipe(
                            map(movie => ({...movie, poster_path: environment.images_url + movie.poster_path, backdrop_path: environment.images_url + movie.backdrop_path } as IMovieDetails) )
                          )

    let movieRecommendation = this.getRecommendation(id);

    return forkJoin([movieDetails, movieRecommendation]);

  }

  getRecommendation(id: number) {
    const movieUrl = `${environment.app_url}movie/${id}/recommendations`;

    let httpParams = new HttpParams();

    const params = httpParams.set('api_key', environment.api_key)

                             .set('language', 'en-US')

    return this.httpClient.get<IPaginationResult<IMovieRecommendation>>(movieUrl, {params: params})
                          .pipe(
                            map(movie =>
                                (
                                {
                                  page: movie.page, total_results: movie.total_results,
                                  results: this.mapMoviePathImages(movie.results)
                                 } as IPaginationResult<IMovieRecommendation>
                                )
                              ),
                          )
  }


  searchMovies(query: string, pageNumber?: number) {


    const searchUrl  = environment.app_url + "search/movie";

    const page = pageNumber ?? 1;

    let httpParams = new HttpParams();

    const params = httpParams.set('api_key', environment.api_key)
                             .set('language', 'en-US')
                             .set("query", query)
                             .set('page', page);

    return this.httpClient.get<IPaginationResult<IMovieResult>>(searchUrl, {params: params}).pipe(
      tap(movies => console.log("movie", movies)),
      map(movie => ({movies: this.mapMoviePathImages(movie.results), page: movie.page, total_movies: movie.total_results})),
    )

  }

}
