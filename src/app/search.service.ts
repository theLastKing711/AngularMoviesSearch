import { MovieService } from './movie.service';
import { IMovieItem } from 'src/types/movie';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  movies: BehaviorSubject<IMovieItem[]> = new BehaviorSubject<IMovieItem[]>([]);

  movies$: Observable<IMovieItem[]> = this.movies.asObservable();

  constructor(private movieService: MovieService) {}

  searchMovies(query: string, pageNumber: number | undefined): void {
    this.movieService
      .searchMovies(query, pageNumber)
      .pipe(debounceTime(700))
      .subscribe((data) => {
        this.movies.next(data);
      });
  }

  restMovies(): void {
    this.movies.next([]);
  }
}
