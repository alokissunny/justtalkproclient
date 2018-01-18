import { Injectable } from '@angular/core';
import {advisors} from './dummydata';
import { Observable } from 'rxjs/Observable';
import {Advisor} from '../../_models/advisormodel'
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AdvisorService {

  constructor(private http: Http) { }
  getAdvisor(cat: String,curLat?,curLng?) {
    let params = "?"+"lat="+curLat+"&lng="+curLng;

    return this.http.get('/advisors/get/'+cat+params).map((response: Response) => response.json());
   
  }

}
