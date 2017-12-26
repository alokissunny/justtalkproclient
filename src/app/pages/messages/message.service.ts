import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Advisor } from '../../_models/advisormodel'
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { data } from './dummydata'
import {UserService} from '../../_services/user.service';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class MessageService {

    refreshChannel = new Subject();
    currentUser : String;
    //hack
    queryID:String;
    constructor(private http: Http, private userService : UserService) { }

    getAllMessages() {

            this.currentUser = this.userService.getCurrentUser().username;
        return this.http.get('/ask/requestor/'+this.currentUser).map((response: Response) => response.json());

    }
    deleteMessage(id) {
          return this.http.post('/ask/delete/'+id,{});
    }
    readMessage(id) {
        return this.http.post('/ask/read/'+id,{});
    }
    sendReply(id, data) {
        return this.http.post('/ask/sendreply/'+id, data);
    }

}
