import { IMovieResult } from './../../../types/movie';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {

  @Input() movie!: IMovieResult;

  constructor() { }

  ngOnInit(): void {

  }

}
