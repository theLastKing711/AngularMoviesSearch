import { SearchService } from './../search.service';
import { IMovieResult } from './../../types/movie';
import { MovieService } from './../movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies$!: Observable<{
    movies: IMovieResult[];
    page: number;
    total_movies: number;
  }>;

  constructor(
    private movieService: MovieService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      let pageNumber: number;

      const pageParam = param.get('page');

      if (pageParam != null) {
        pageNumber = parseInt(pageParam);
      } else {
        pageNumber = 1;
      }

      this.movies$ = this.movieService.getMovies(pageNumber);
    });
  }

  pageChange(e: PageEvent) {
    const nextPage = e.pageIndex + 1;

    this.router.navigate(['/'], { queryParams: { page: nextPage } });
  }
}
