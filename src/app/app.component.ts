import { Component } from '@angular/core';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular1';
  formedQuery = '';
  query = '';
  previous_query = '';
  previous_formedQuery = '';
  offset = 0;
  results = [];
  loading = false;
  searched = false;
  error = false;
  pagination = 5;
  constructor(private service: DataService) {}

  search(offset = 0) {
    if (!(<HTMLInputElement>document.getElementById('search')).value) return;
    this.formQuery(offset);
    if (this.formedQuery == this.previous_formedQuery) return;
    this.previous_query = this.formedQuery;
    if (this.query != this.previous_query) this.offset = 0;
    this.previous_query = this.query;
    this.results = [];
    this.loading = true;
    this.searched = false;
    this.error = false;
    this.service.getResults(this.formedQuery).subscribe(
      (data) => {
        this.previous_query = this.formedQuery;
        console.log(data);
        this.results = data['results'];
        this.loading = false;
        this.searched = true;
        this.error = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.error = true;
      }
    );
  }
  formQuery(offset) {
    this.query = (<HTMLInputElement>document.getElementById('search')).value;
    this.formedQuery = this.query.replace(/,-_./g, ' ').split(' ').join('+');
    this.formedQuery = `?q=${this.formedQuery}&offset=${offset}&pagination=${this.pagination}`;
    return this.formedQuery;
  }
  prev() {
    if (this.offset <= 0) return;
    this.offset -= 1;
    this.search(this.offset);
  }
  next() {
    if (this.results.length < this.pagination) return;
    this.offset += 1;
    this.search(this.offset);
  }
}
