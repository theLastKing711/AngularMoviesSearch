import {IMovieResult } from './../../types/movie';
import { MovieService } from './../movie.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {


  @Input() movies!: IMovieResult[];


  constructor() { }

  ngOnInit(): void {
  }

}
