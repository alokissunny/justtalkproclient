import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {QueryModel}  from '../../_models/QueryModel';
import * as _ from 'lodash';
//import the file uploader plugin
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {UserService} from '../../_services/user.service';
//define the constant url we would be uploading to.
const URL = 'http://localhost:4000/upload';

@Component({
  selector: 'profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    //This is the default title property created by the angular cli. Its responsible for the app works 
  public editEnabled = true;
  public picurl: string;
  public user : any = {};

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private cd: ChangeDetectorRef , private userService: UserService) {

  }
  ngOnInit() {
    this.user = this.userService.getCurrentUser();

  }
  modify() {
    this.profileService.updateUserInfo(this.user).subscribe((res) => {
      console.log("upadted");
    })
  }




}
