import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import {Advisor} from '../_models/advisormodel';
import { ReplaySubject } from 'rxjs';
@Injectable()
export class UserService {
    curLat : Number;
    curLng : Number;
    currentLocationChanged  = new ReplaySubject();
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/users').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/users/' + _id).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/users/register', user);
    }
    createAdvisor(advisor : Advisor) {
        return this.http.post('/advisors/register',advisor);
    }
    update(user: User) {
        return this.http.put('/users/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete('/users/' + _id);
    }
    getCurrentUser() {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        return user? user :{firstName :  "Hi Guest !"};
    }
    isSessionActive() {
        return localStorage.getItem('currentUser') ? true : false;
    }
    isLoginUserAdvisor(){
        var user = JSON.parse(localStorage.getItem('currentUser'));
        return this.isSessionActive() && user.isAdvisor;
    }
}