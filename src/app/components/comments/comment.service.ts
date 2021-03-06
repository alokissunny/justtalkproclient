import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {appConfig} from '../../app.config';
import {CommentModel} from '../../_models/commentModel';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class CommentService {
     //hack
  advisorId: String;
  currentRating : Number;
  rateCount :Number;
    url = appConfig.apiUrl;
    dummyData = [{
        cname: "alok",
        cid : "test",
        photo : "7dc15081041a2661c0988794faabdcb1",
        comment : "first comment",
        time : Date.now()
    }]
  constructor(private http: Http) { }
  getComments(advisor) {
    return this.http.get('/comment/get/'+advisor).map((res) => {
       return res.json();
    })
//    let ret = new ReplaySubject();
//    setTimeout(() => {
//         ret.next(this.dummyData);
//    }, 0);
//    return ret;
  }
  addComment(comment:CommentModel , newrate : Number , rateCount , username) {
      let first = this.http.post('/advisors/rate',{currentRating : newrate , rateCount : rateCount , username : username});
      let second =  this.http.post('/comment/post',comment);
      return Observable.forkJoin(first,second)
  }

}
