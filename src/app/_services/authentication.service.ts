import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { ReplaySubject } from 'rxjs';

@Injectable()
export class AuthenticationService {

    onLogin = new ReplaySubject();
    constructor(private http: Http) { }

    login(username: string, password: string , isAdvisor :boolean) {
        return this.http.post('/users/authenticate', { username: username, password: password , isAdvisor : isAdvisor })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response;
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}