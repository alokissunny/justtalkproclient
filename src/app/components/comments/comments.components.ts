import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../_services/user.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { CommentService } from './comment.service';
import { CommentModel } from '../../_models/commentModel';
import { appConfig } from '../../app.config';
import * as constant from '../../constants';
@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit {
  rating :any ;
  currentRating:any= constant.BASE_RATE;
  rateCount:any = constant.BASE_RATE_COUNT;
  content = `feedback added!`;
  timeout = 1200;
  toastsLimit = 5;
  type = 'default';
  config: ToasterConfig;
  comment: CommentModel;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  comments = [];
  message: String;
  constructor(private activeModal: NgbActiveModal, private userService: UserService, private commentService: CommentService,
    private toasterService: ToasterService) {
    this.comment = new CommentModel();
  }
  ngOnInit() {
    this.currentRating = this.commentService.currentRating ? this.commentService.currentRating : constant.BASE_RATE;
    this.rateCount = this.commentService.rateCount ? this.commentService.rateCount : constant.BASE_RATE_COUNT;
    this.rating = this.currentRating;
    this.getComments();
  }
  getComments() {
    this.commentService.getComments(this.commentService.advisorId).subscribe((comments: any) => {
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
  addComment() {
    if (this.message.length > 0) {
      let newrate = this.rateUpdate();
      this.comment.cid = this.userService.getCurrentUser().username;
      this.comment.cname = this.userService.getCurrentUser().firstName;
      this.comment.comment = this.message;
      this.comment.advisorId = this.commentService.advisorId;
      this.comment.photo = this.userService.getCurrentUser().photo;
      this.comment.time = Date.now();
      this.commentService.addComment(this.comment).subscribe(() => {
        this.message = '';
        this.rating = newrate;
        this.showToast(this.type, this.content);
        this.getComments();
        //this.activeModal.close();
      })
    }
  }
  rateUpdate() {
    let newrate:Number = (this.currentRating* this.rateCount + this.rating) / (this.rateCount + 1 );
    return newrate;
  }
}
