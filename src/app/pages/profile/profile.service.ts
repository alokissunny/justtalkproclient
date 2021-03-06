import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Advisor } from '../../_models/advisormodel'
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserService } from '../../_services/user.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
@Injectable()
export class ProfileService {   
    url = "/upload/updateimage";
    url2 = "/users/modify";
    url3 = "/advisors/current/"
    constructor(private http: Http, private userService: UserService) { }

    updatePicInfo(data: any) {
        return this.http.post(this.url, data);
    }
    updateUserInfo(data) {
        return this.http.post(this.url2,data).map(res => {
            res.json();
        })
    }
    getBasicInfo(id) {
        return this.http.get(this.url3 + id).map(res => res.json())
    }

}
