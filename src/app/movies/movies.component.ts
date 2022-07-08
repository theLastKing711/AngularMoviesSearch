import { SearchService } from './../search.service';
import { IMovieResult } from './../../types/movie';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies!: IMovieResult[];
  page!: number;
  total_movies!: number;

  constructor(private movieService: MovieService,private searchService: SearchService) { }

  ngOnInit(): void {

    this.getMovies();

    this.searchService
      .query
      .pipe(debounceTime(700)).subscribe(query => {

        if(query === "") {
          this.getMovies();
        }

        else {
          this.movieService.searchMovies(query, 1)
          .subscribe(items => {
            const { movies, page, total_movies }  = items;
            this.movies = [...items.movies]
            this.page = items.page - 1;
            this.total_movies = total_movies;
          })
        }

    })
  }

  getMovies(pageNumber : number = 1) {
    this.movieService.getMovies(pageNumber).subscribe(items => {

      const { movies, page, total_movies }  = items;
      this.movies = [...items.movies]
      this.page = items.page - 1;
      this.total_movies = total_movies;
    })
  }

  pageChange(e: PageEvent) {
    const nextPage = e.pageIndex + 1;

    const query = this.searchService.query.getValue()


    if(query !== "") {

      this.movieService.searchMovies(query, nextPage).subscribe(items => {
        const { movies, page, total_movies }  = items;
        this.movies = [...items.movies]
        this.page = items.page - 1;
        this.total_movies = total_movies;
      })
    }
    else {
      this.getMovies(nextPage)
    }

  }

}
