import { Injectable } from '@angular/core';
import {advisors} from './dummydata';
import { Observable } from 'rxjs/Observable';
import {Advisor} from '../../_models/advisormodel'
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AdvisorService {

  constructor(private http: Http) { }
  getAdvisor(cat: String) {

    return this.http.get('/advisors/get/'+cat).map((response: Response) => response.json());
    //   const ret = new ReplaySubject(1);
    //   setTimeout( () => {
    //       ret.next(advisors);
    //   });
    //   return ret;

  }

}
