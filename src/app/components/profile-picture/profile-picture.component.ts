import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {ProfileService } from '../../pages/profile/profile.service';
import {UserService} from '../../_services/user.service';
import {AuthenticationService} from '../../_services/authentication.service';
const URL = 'http://localhost:4000/upload';
@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  public uploader: FileUploader;
  private hasDragOver = false;


  @Input()
  private editmode = false;

  @Input()
  private url = '';

  imageId = '';

  @Output()
  private urlChange = new EventEmitter();

  constructor(private profileService : ProfileService , private userService : UserService , private authentication : AuthenticationService) {
    this.uploader = new FileUploader({ url: URL, itemAlias: 'photo', autoUpload: true ,allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
        maxFileSize: 10*1024*1024});


    this.uploader.response.subscribe(res => {
      // Upload returns a JSON with the image ID
      this.url = 'http://localhost:4000/get/' + JSON.parse(res).id;
      this.urlChange.emit(this.url);
    });
  }

  public fileOver(e: any): void {
    this.hasDragOver = e;
  }

  ngOnInit() {
    this.imageId = this.userService.getCurrentUser().photo;
    if(this.imageId)
    this.url = "http://localhost:4000/images/" + this.imageId;
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
     let res = JSON.parse(response);
     this.imageId = res["profile-id"].split('/')[3];
     this.url = "http://localhost:4000/images/" + this.imageId;
     this.profileService.updatePicInfo({"me" : this.userService.getCurrentUser().username , "photo" : this.imageId , "isAdvisor" : this.userService.isLoginUserAdvisor()
    }).subscribe(() => {
      let user = this.userService.getCurrentUser();
      user.photo = this.imageId;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.authentication.onLogin.next({});
    })
    }
  }
}