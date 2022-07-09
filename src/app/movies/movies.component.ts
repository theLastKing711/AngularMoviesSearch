import { SearchService } from './../search.service';
import { IMovieResult } from './../../types/movie';
import { MovieService } from './../movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(private movieService: MovieService,private searchService: SearchService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(param => {

      let pageNumber: number;

      const pageParam = param.get('page')

      if(pageParam != null) {
        pageNumber = parseInt(pageParam)
      }
      else {
        pageNumber = 1;
      }

      this.getMovies(pageNumber)

    })


  }

  getMovies(pageNumber : number = 1) {

    this.loading = true;

    this.moviesSubscription = this.movieService.getMovies(pageNumber).subscribe(items => {

      const { total_movies }  = items;
      this.movies = [...items.movies]
      this.page = items.page - 1;
      this.total_movies = total_movies;

      this.loading = false;

    })

  }


  pageChange(e: PageEvent) {

      const nextPage = e.pageIndex + 1;

      this.page = nextPage;

      this.router.navigate(['/'], { queryParams: { page: nextPage } })

  }

  ngOnDestroy() {

    this.moviesSubscription.unsubscribe();

  }

}
