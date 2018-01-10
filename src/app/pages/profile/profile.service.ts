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
    constructor(private http: Http, private userService: UserService) { }

    updatePicInfo(data: any) {
        return this.http.post(this.url, data);
    }

}
