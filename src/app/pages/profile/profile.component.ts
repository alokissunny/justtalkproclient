import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { QueryModel } from '../../_models/QueryModel';
import * as _ from 'lodash';
//import the file uploader plugin
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { CATEGORIES } from '../../constants';
import { CATMAP } from '../../constants';
import { CODE } from '../../constants';
import {GoogleService} from '../../_services/google.service';
import {appConfig} from '../../app.config';
//define the constant url we would be uploading to.
const URL = appConfig.apiUrl+'/upload';

@Component({
  selector: 'profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {


  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  //This is the default title property created by the angular cli. Its responsible for the app works 
  public editEnabled = false;
  public picurl: string;
  public user: any = {};
  isAdvisor = false;
  advisorCategories = CATEGORIES;
  catMap = CATMAP;
  code = CODE;
  imageId = '';

  constructor(private router: Router, private profileService: ProfileService, private route: ActivatedRoute, private cd: ChangeDetectorRef, private userService: UserService,
    private authentication: AuthenticationService , private googleService: GoogleService) {

  }
  ngOnInit() {
    this.onInit();
    this.route.params.subscribe(() => {
      this.onInit();
    })
  }
  onInit(){
    let id = this.route.snapshot.paramMap.get('id');
    if (id == "me") {
      this.user = this.userService.getCurrentUser();
      this.isAdvisor = this.userService.isLoginUserAdvisor();
      this.imageId = this.user.photo;
      this.editEnabled = true;
    }
    else {
      this.profileService.getBasicInfo(id).subscribe(user => {
        this.user = user;
        this.isAdvisor = true;
        this.imageId = this.user.photo;
        this.editEnabled = false;
        this.cd.markForCheck();
      });
    }
  }
  modify() {
    if(this.validation()) {
      let location = this.user.location? this.user.location +"+"+this.user.city : this.user.city;
    this.googleService.getGoogleLocation(location).subscribe(res => {
      this.user.lat = res.results[0].geometry.location.lat;
      this.user.lng = res.results[0].geometry.location.lng;
      this.profileService.updateUserInfo(this.user).subscribe((res) => {
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      this.authentication.onLogin.next({});
      this.router.navigateByUrl('/');

    })
    })
     }
  }
  validation() {
    return true;
  }
  onChange(sel) {
    this.user.category = this.code[sel];
  }




}
