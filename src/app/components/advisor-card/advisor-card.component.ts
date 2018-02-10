import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostQueryComponent } from '../post-query/post-query.component';
import { PostCommentComponent } from '../comments/comments.components';
import { Advisor } from '../../_models/advisormodel';
import { QueryService } from '../post-query/post-query.service';
import { Component, Inject } from '@angular/core';
import { BookComponent } from '../book-cancel/book-cancel.component';
import { BookService } from '../book-cancel/book-cancel.service';
import { UserService } from '../../_services/user.service';
import { LoginComponent } from '../../login/login.component';
import { appConfig } from '../../app.config';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommentService } from '../comments/comment.service';
import { FavModel } from '../../_models/favModel';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';


@Component({
  selector: 'app-advisor-card',
  templateUrl: './advisor-card.component.html',
  styleUrls: ['./advisor-card.component.scss'],
})
export class AdvisorCardComponent implements OnInit {

  about: String = 'ADD DESCRIPTION';
  _advisor: Advisor;
  currentRate: any = 3;
  pic: String;
  isDisable = false;
  isFavPage = false;
  content = `Query Submitted Successfully!`;
  timeout = 1200;
  toastsLimit = 5;
  type = 'default';
  config: ToasterConfig;

  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  @Output()
  refresh: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  set advisor(value: Advisor) {
    this._advisor = value;
    this.ref.markForCheck();

  }
  get advisor(): Advisor {
    return this._advisor;

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
  constructor(private router: Router, private modalService: NgbModal, private toasterService: ToasterService,
    private ref: ChangeDetectorRef, private commentService: CommentService,
    private query: QueryService, private bookService: BookService, private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isFavPage = this.route.snapshot.paramMap.get('cat') === "fav" ? true : false;
    this.currentRate = this._advisor.currentRating ? this._advisor.currentRating : 3;
    this.currentRate = parseFloat(this.currentRate.toFixed(1));
    this._advisor.photo = this._advisor.photo ? this._advisor.photo : 'placeholder';
    this.pic = appConfig.apiUrl + "/images/" + this._advisor.photo;
    if (this.userService.getCurrentUser().username === this._advisor.username) {
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
    this.router.navigateByUrl('/pages/profile/' + this._advisor._id)
  }
  addToFav() {
    let postData: FavModel = new FavModel();
    postData.username = this.userService.getCurrentUser().username;
    postData.fav = this._advisor.username;
    postData._id = this._advisor._id;
    postData.favCat = this._advisor.category;
    this.query.addToFav(postData).subscribe(() => {
      this.showToast(this.type,"favorite added");
    }, () => {
       this.showToast(this.type,"Already added in your fav list");
    });

  }
  removeFav() {
    let postData = {
      username: this.userService.getCurrentUser().username,
      fav: this._advisor.username
    }
    this.query.removeFav(postData).subscribe(() => {
     this.showToast(this.type,"favorite removed")
      this.refresh.emit();
    })
  }

}
