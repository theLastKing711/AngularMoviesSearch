import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  query: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // query$: Observable<string> = this.query.asObservable();

  // nextQuery(query: string): void {
  //   this.query.next(query);
  // }

  constructor() {}
}
