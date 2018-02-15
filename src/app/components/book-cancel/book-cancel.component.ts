import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { BookService } from './book-cancel.service';
import { BookingModel } from '../../_models/bookingmodel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
const now = new Date();
@Component({
    selector: 'book-cancel',
    templateUrl: './book-cancel.component.html',
    styleUrls: ['./book-cancel.component.scss']
})
export class BookComponent implements OnInit {
    bookModel: BookingModel;
    constructor(private bookService: BookService, private userService: UserService, private acticeModal: NgbActiveModal ,
     private toasterService: ToasterService) {
        this.bookModel = new BookingModel();
        this.time = "Before";
    }
    message = "";
    model;
    time;
    content = `Appointment Booked Successfully!`;
    timeout = 1200;
    toastsLimit = 5;
    type = 'default';
    config: ToasterConfig;

    isHideOnClick = true;
    isDuplicatesPrevented = false;
    isCloseButton = true;
    ngOnInit() {
        this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

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
    book() {
        this.bookModel.start = new Date(this.model.year, this.model.month - 1, this.model.day).getTime();
        this.bookModel.title = this.message;
        this.bookModel.requestor = this.userService.getCurrentUser().username;
        this.bookModel.requestorName = this.userService.getCurrentUser().firstName;
        this.bookModel.advisor = this.bookService.advisor;
        this.bookModel.time = this.time;
        this.bookService.book(this.bookModel).subscribe(() => {
            this.showToast(this.type,this.content);
            this.acticeModal.close();
        });
    }
}