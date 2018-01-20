import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ProfileService } from '../../pages/profile/profile.service';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
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
  public editmode = false;

  @Input()
  public url = '';
  _imageId = '';

  @Input()
  set imageId(val) {
    this._imageId =val;
    this.url = "http://localhost:4000/images/" + this._imageId;
  }

  @Output()
  private urlChange = new EventEmitter();

  constructor(private profileService: ProfileService, private userService: UserService, private authentication: AuthenticationService) {
    this.uploader = new FileUploader({
      url: URL, itemAlias: 'photo', autoUpload: true, allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
      maxFileSize: 10 * 1024 * 1024
    });


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
    // if (this.imageId)
    //   this.url = "http://localhost:4000/images/" + this.imageId;
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let res = JSON.parse(response);
      this._imageId = res["profile-id"].split('/')[3];
      this.url = "http://localhost:4000/images/" + this._imageId;
      this.profileService.updatePicInfo({
        "me": this.userService.getCurrentUser().username, "photo": this._imageId, "isAdvisor": this.userService.isLoginUserAdvisor()
      }).subscribe(() => {
        let user = this.userService.getCurrentUser();
        user.photo = this._imageId;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authentication.onLogin.next({});
      })
    }
  }
}
