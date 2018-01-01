import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class BookService {
    advisor : String;

    constructor(private http:Http) {

    }
    book(data) {
        return this.http.post("/appointment/book",data);
    }
}