import { OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostQueryComponent } from '../post-query/post-query.component';
import {PostCommentComponent} from '../comments/comments.components';
import { Advisor } from '../../_models/advisormodel';
import { QueryService } from '../post-query/post-query.service';
import { Component, Inject } from '@angular/core';
import { BookComponent } from '../book-cancel/book-cancel.component';
import { BookService } from '../book-cancel/book-cancel.service';
import { UserService } from '../../_services/user.service';
import { LoginComponent } from '../../login/login.component';
import { appConfig } from '../../app.config';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {CommentService} from '../comments/comment.service';


@Component({
  selector: 'app-advisor-card',
  templateUrl: './advisor-card.component.html',
  styleUrls: ['./advisor-card.component.scss'],
})
export class AdvisorCardComponent implements OnInit {

  about: String = 'ADD DESCRIPTION';
  _advisor: Advisor;
  currentRate:any = 3;
  pic: String;
  isDisable = false;
  @Input()
  set advisor(value: Advisor) {
    this._advisor = value;
    this.ref.markForCheck();

  }
  get advisor(): Advisor {
    return this._advisor;

  }
  constructor(private router : Router ,private modalService: NgbModal, private ref: ChangeDetectorRef,private commentService: CommentService,
   private query: QueryService, private bookService: BookService, private userService: UserService) {
  }

  ngOnInit() {
    this.currentRate = this._advisor.currentRating ? this._advisor.currentRating: 3;
    this.currentRate= parseFloat(this.currentRate.toFixed(1));
    this._advisor.photo = this._advisor.photo ? this._advisor.photo : 'placeholder';
    this.pic = appConfig.apiUrl + "/images/" + this._advisor.photo;
    if(this.userService.getCurrentUser().username === this._advisor.username) {
      this.isDisable = true;
    }
  }
  openQuery() {
    if (this.userService.isSessionActive()) {
      this.query.advisor = this._advisor.username;
      const activeModal = this.modalService.open(PostQueryComponent, { size: 'lg', container: 'nb-layout' });

      activeModal.componentInstance.modalHeader = 'Large Modal';
    }
    else {
      const activeModal = this.modalService.open(LoginComponent, { size: 'lg', container: 'nb-layout' });

      activeModal.componentInstance.modalHeader = 'Large Modal';
    }
  }
  openfeedBack() {
    if (this.userService.isSessionActive()) {
      this.commentService.advisorId = this._advisor.username;
       this.commentService.currentRating = this._advisor.currentRating;
        this.commentService.rateCount = this._advisor.rateCount;
      const activeModal = this.modalService.open(PostCommentComponent, { size: 'lg', container: 'nb-layout' });

      activeModal.componentInstance.modalHeader = 'Large Modal';
    }
    else {
      const activeModal = this.modalService.open(LoginComponent, { size: 'lg', container: 'nb-layout' });

      activeModal.componentInstance.modalHeader = 'Large Modal';
    }
  }
  bookcancel() {
    this.bookService.advisor = this._advisor.username;
    const activeModal = this.modalService.open(BookComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';

  }
  details() {
    this.router.navigateByUrl('/pages/profile/'+this._advisor._id)
  }

}
