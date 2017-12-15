import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Advisor } from '../../_models/advisormodel'
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { data } from './dummydata'
import {UserService} from '../../_services/user.service';

@Injectable()
export class MessageService {

    currentUser : String;
    constructor(private http: Http, private userService : UserService) { }

    getAllMessages() {

            this.currentUser = this.userService.getCurrentUser().username;
        return this.http.get('/ask/requestor/'+this.currentUser).map((response: Response) => response.json());

    }

}
