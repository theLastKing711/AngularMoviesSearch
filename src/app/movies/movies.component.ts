import { SearchService } from './../search.service';
import { IMovieResult } from './../../types/movie';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, skip, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies!: IMovieResult[];
  page!: number;
  total_movies!: number;

  loading!: boolean;

  moviesSubscription!: Subscription;
  searchSubscription!: Subscription;
  searchInputSubscription!: Subscription;

  constructor(private movieService: MovieService,private searchService: SearchService) { }

  ngOnInit(): void {

    this.getMovies();

    this.searchInputSubscription = this.searchService
      .query
      .pipe(debounceTime(700), skip(1)).subscribe(query => {


        this.loading = true;

        if(query === "") {
          this.getMovies();
        }

        else {
          this.searchMovies(query, 1)
        }

    })
  }

  getMovies(pageNumber : number = 1) {

    this.loading = true;

    this.moviesSubscription = this.movieService.getMovies(pageNumber).subscribe(items => {

      const { movies, page, total_movies }  = items;
      this.movies = [...items.movies]
      this.page = items.page - 1;
      this.total_movies = total_movies;

      this.loading = false;

    })
  }

  searchMovies(query: string, nextPage?: number) {

    this.loading = true;

    this.searchSubscription = this.movieService.searchMovies(query, nextPage).subscribe(items => {
      const { movies, page, total_movies }  = items;
      this.movies = [...items.movies]
      this.page = items.page - 1;
      this.total_movies = total_movies;

      this.loading = false;

    })
  }


  pageChange(e: PageEvent) {
    const nextPage = e.pageIndex + 1;

    const query = this.searchService.query.getValue()


    if(query !== "") {

      this.searchMovies(query, nextPage)
    }
    else {
      this.getMovies(nextPage)
    }

  }

  ngOnDestroy() {

    this.moviesSubscription.unsubscribe();


    if(this.searchSubscription)
    {
      this.searchSubscription.unsubscribe();
    }

    if(this.searchInputSubscription)
    {
      this.searchInputSubscription.unsubscribe();
    }
  }

}
