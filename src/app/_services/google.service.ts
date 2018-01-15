import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { ReplaySubject } from 'rxjs';
const API_KEY = "AIzaSyDh0cCwo1_WRML-0QYxKP60LkClJC3Tjig";
@Injectable()

export class GoogleService {
    geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    constructor(private http: Http) { }
    getGoogleLocation(address) {
       let url= this.geocode_url+address+"&key="+API_KEY;
        return (this.http as any).getx(url).map((res)=>{
            return res.json();

        })
    }
}