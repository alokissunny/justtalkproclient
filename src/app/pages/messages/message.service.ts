import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Advisor } from '../../_models/advisormodel'
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { data } from './dummydata'
import { UserService } from '../../_services/user.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
@Injectable()
export class MessageService {

    refreshChannel = new Subject();
    currentUser: String;
    myfirstName: String;
    //hack
    queryID: String;
    constructor(private http: Http, private userService: UserService) { }

    getAllMessages() {

        this.currentUser = this.userService.getCurrentUser().username;
        this.myfirstName = this.userService.getCurrentUser().firstName;
        if (this.userService.isLoginUserAdvisor()) {
            let first: Observable<Response> =  this.http.get('/ask/advisor/' + this.currentUser);
            let second : Observable<Response> =  this.http.get('/ask/requestor/' + this.currentUser);
            return (Observable.forkJoin(first,second) as any ).map(function(response) {
                console.log(response);
                let ret1 = response[0].json();
                let ret2 = response[1].json();
                return ret1.concat(ret2);
            });
        }

        return this.http.get('/ask/requestor/' + this.currentUser).map((response: Response) => {
            return response.json()
        });

    }
    deleteMessage(id, isRequestor) {
        if (!isRequestor) {
            return this.http.post('/ask/deletea/' + id, {});
        }
        else {
            return this.http.post('/ask/deleter/' + id, {});
        }
        // return this.http.post('/ask/delete/' + id, {});
    }
    readMessage(id,isRequestor) {
        if (!isRequestor) {
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
