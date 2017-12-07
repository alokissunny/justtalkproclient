import { Injectable } from '@angular/core';
import {advisors} from './dummydata';
import { Observable } from 'rxjs/Observable';
import {Advisor} from '../../_models/advisormodel'
import { ReplaySubject } from 'rxjs';

@Injectable()
export class AdvisorService {

  constructor() { }
  getAdvisor(cat : String) {
      var ret = new ReplaySubject(1);
      setTimeout( () => {
          ret.next(advisors);
      });
      return ret;

  }

}
