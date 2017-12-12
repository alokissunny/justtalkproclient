import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class QueryService {
_advisor:String;
baseUrl = "/ask/query";
set advisor(value: String) {
  this._advisor = value;
}
get advisor (): String {
  return this._advisor;
}
  constructor(private http: Http) { }
  postQuery(data) {
    return this.http.post(this.baseUrl, data);
  }

}
