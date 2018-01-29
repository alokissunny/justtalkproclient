import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../_services/user.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import {CommentService} from './comment.service';
import {CommentModel} from '../../_models/commentModel';
import { appConfig } from '../../app.config';
@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss' ],
})
export class PostCommentComponent implements OnInit {
 starRate = 3;
  content = `feedback added!`;
  timeout = 1200;
  toastsLimit = 5;
  type = 'default';
  config: ToasterConfig;
  comment : CommentModel;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  comments = [];
  message : String ;
   constructor(private activeModal : NgbActiveModal, private userService: UserService , private commentService : CommentService,
    private toasterService: ToasterService) {
      this.comment = new CommentModel();
     }
   ngOnInit() {
     this.getComments();
  }
  getComments() {
this.commentService.getComments(this.commentService.advisorId).subscribe((comments:any) => {
      this.comments = comments;
     })
  }
    private showToast(type: string, body: string) {
    const toast: Toast = {
      type: type,
    //  title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
  addComment () {
    if(this.message.length >0 ) {
    this.comment.cid = this.userService.getCurrentUser().username;
    this.comment.cname= this.userService.getCurrentUser().firstName;
    this.comment.comment= this.message;
    this.comment.advisorId = this.commentService.advisorId;
    this.comment.photo = this.userService.getCurrentUser().photo;
    this.comment.time = Date.now();
    this.commentService.addComment(this.comment).subscribe(() => {
      this.message = '';
      this.showToast(this.type, this.content);
      this.getComments();
//this.activeModal.close();
    })
    }
  }
}
