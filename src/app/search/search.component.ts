import { debounceTime, Subscription } from 'rxjs';
import { MovieService } from './../movie.service';
import { SearchService } from './../search.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMovieItem } from 'src/types/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  moviesList!:  IMovieItem[];
  query!: string;

  searchSubscription!: Subscription

  constructor(private searchService: SearchService, private movieService: MovieService) { }

  ngOnInit(): void {
  }

  searchMovies(query: string) {
    this.movieService.searchMovies(query, 1)
                     .pipe(debounceTime(700))
                     .subscribe(movies => {
                      this.moviesList = [...movies];
                     })
  }

  handleSearchChange(e: any) {
    const query = e.target.value;
    this.query = query;
    if(query) {
      this.searchMovies(query)
    }
    else {
      this.moviesList = []
    }
  }

  handleSearchFocus() {

    if(this.query)
    {
      this.searchMovies(this.query)
    }

  }

  handleSearchBlur() {
    setTimeout(() => {
      this.moviesList = [];
    }, 90)
  }

  ngOnDestroy(): void {
      this.searchSubscription.unsubscribe()
  }

}
