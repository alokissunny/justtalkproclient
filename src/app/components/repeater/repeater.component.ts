import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ProfileService } from '../../pages/profile/profile.service';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import {appConfig} from '../../app.config';
const URL = appConfig.apiUrl +'/upload';
@Component({
  selector: 'app-repeater',
  templateUrl: './repeater.html',
  styleUrls: ['./repeater.scss']
})
export class RepeaterComponent implements OnInit {


public _skills = [];
@Input()
set skills(val : any ){
    if(val) {
this._skills = val;
    }
}
get skills () : any {
    return this._skills;
}
maxlength = 5;
minlength = 1;
    ngOnInit() {
        let skill = {name : ""};
        this.skills.push(skill);
        
    }
    add() {
        
        this.skills.push({});
       
    }
    remove() {
        this.skills = this.skills.slice(0, this.skills.length -1);
    }
}