import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {QueryModel}  from '../../_models/QueryModel';
import * as _ from 'lodash';
//import the file uploader plugin
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
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

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {

  }
  ngOnInit() {
    // this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //  this.uploader.onBeforeUploadItem = ((file)=> {
    //       console.log("before upload");
    //     });
    //    //overide the onCompleteItem property of the uploader so we are 
    //    //able to deal with the server response.
    //    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
    //         console.log("ImageUpload:uploaded:", item, status, response);
    //     };
  }




}
