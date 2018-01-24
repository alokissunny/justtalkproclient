import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class CommentService {
    dummyData = [{
        cname: "alok",
        cid : "test",
        photo : "7dc15081041a2661c0988794faabdcb1",
        comment : "first comment",
        time : Date.now()
    }]
  constructor(private http: Http) { }
  getComments(adviosor) {
   // return this.http.post(this.baseUrl, data);
   let ret = new ReplaySubject();
   setTimeout(() => {
        ret.next(this.dummyData);
   }, 0);
   return ret;
  }

}
