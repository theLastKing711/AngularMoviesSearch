import { debounceTime, Subscription, Observable, filter } from 'rxjs';
import { MovieService } from './../movie.service';
import { SearchService } from './../search.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMovieItem } from 'src/types/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query!: string;

  moviesList$: Observable<IMovieItem[]> = this.searchService.movies$;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  searchMovies(query: string) {
    this.searchService.searchMovies(query, 1);
  }

  handleSearchChange(e: any) {
    const query = e.target.value;
    this.query = query;
    if (query) {
      this.searchMovies(query);
    } else {
      this.searchService.restMovies();
    }
  }

  handleSearchFocus() {
    if (this.query) {
      this.searchMovies(this.query);
    }
  }

  handleSearchBlur() {
    setTimeout(() => {
      this.searchService.restMovies();
    }, 150);
  }
}
