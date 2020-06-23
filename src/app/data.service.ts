import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = 'https://searchengine-application.herokuapp.com/';
  constructor(private http: HttpClient) {}

  getResults(query): Observable<any> {
    return this.http.get(this.baseUrl + query);
  }
}
