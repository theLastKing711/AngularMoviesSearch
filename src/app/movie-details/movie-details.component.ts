import { MovieSnackBarComponent } from './../movie-snack-bar/movie-snack-bar.component';
import { StorageService } from './../storage.service';
import { IPaginationResult } from './../../types/pagination';
import { IMovieDetails, IMovieRecommendation } from './../../types/movie';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  id!: number;

  movie!: IMovieDetails;
  movieReommendations!: IMovieRecommendation[];

  rating!: number;

  loading!: boolean;

  constructor(private movieService: MovieService, private storageService: StorageService,
                private _Activatedroute: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {

      console.log("params", params)


      const p = params.get('id') ?? "1";

      this.id= parseInt(p);

      this.getMovie(parseInt(p))

    });
  }


  getMovie(id: number) {
    this.loading = true;
    this.movieService.getMovie(id).subscribe(movieResults => {

      const [ movieDetails, movieRecommendations] = movieResults

      this.movie = {...movieDetails};
      this.movieReommendations = [...movieRecommendations.results]

      this.loading = false;

    })
  }

  changeRating(e: {rating: number}) {
    this.rating = e.rating;
  }

  submitRating() {
    const siteRatings = this.rating * 2;

    this.movieService.rateMovie(this.id, siteRatings).subscribe(() => {
      this._snackBar.openFromComponent(MovieSnackBarComponent, {
        duration: 1500
      });
    })
  }

  isAuthenticated() {
    return this.storageService.isAuthenticated();
  }

}
