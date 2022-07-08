import { IPaginationResult } from './../../types/pagination';
import { IMovieDetails, IMovieRecommendation } from './../../types/movie';
import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  id!: number;

  movie!: IMovieDetails;
  movieReommendations!: IMovieRecommendation[];

  constructor(private movieService: MovieService, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {

      const p = params.get('id') ?? "1";

      this.getMovie(parseInt(p))

    });
  }


  getMovie(id: number) {
    this.movieService.getMovie(id).subscribe(movieResults => {

      const [ movieDetails, movieRecommendations] = movieResults

      this.movie = {...movieDetails};
      this.movieReommendations = [...movieRecommendations.results]

    })
  }

}
