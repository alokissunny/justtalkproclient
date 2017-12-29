import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Advisor } from '../../_models/advisormodel'
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { data } from './dummydata'
import { UserService } from '../../_services/user.service';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class MessageService {

    refreshChannel = new Subject();
    currentUser: String;
    //hack
    queryID: String;
    constructor(private http: Http, private userService: UserService) { }

    getAllMessages() {

        this.currentUser = this.userService.getCurrentUser().username;
        if (this.userService.isLoginUserAdvisor()) {
            return this.http.get('/ask/advisor/' + this.currentUser).map((response: Response) => response.json());
        }

        return this.http.get('/ask/requestor/' + this.currentUser).map((response: Response) => response.json());

    }
    deleteMessage(id) {
        if (this.userService.isLoginUserAdvisor()) {
            return this.http.post('/ask/deletea/' + id, {});
        }
        else {
            return this.http.post('/ask/deleter/' + id, {});
        }
        // return this.http.post('/ask/delete/' + id, {});
    }
    readMessage(id) {
        if (this.userService.isLoginUserAdvisor()) {
            return this.http.post('/ask/reada/' + id, {});
        }
        else {
            return this.http.post('/ask/readr/' + id, {});
        }

    }
    sendReply(id, data) {
        return this.http.post('/ask/sendreply/' + id, data);
    }

}
