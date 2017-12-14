import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Advisor } from '../../_models/advisormodel'
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { data } from './dummydata'

@Injectable()
export class MessageService {

    constructor(private http: Http) { }

    getAllMessages() {
          const ret = new ReplaySubject(1);
      setTimeout( () => {
          ret.next(data);
      });
      return ret;
    }

}
