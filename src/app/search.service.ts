import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  query: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() { }
}
