import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../_services/user.service';
import {BookService} from './book-cancel.service';
import {BookingModel} from '../../_models/bookingmodel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'book-cancel',
  templateUrl: './book-cancel.component.html',
  styleUrls: ['./book-cancel.component.scss']
})
export class BookComponent implements OnInit {
     bookModel : BookingModel;
    constructor(private bookService : BookService , private userService : UserService , private acticeModal : NgbActiveModal) {
        this.bookModel = new BookingModel();
        this.time = "Before";
    }
message = "";
model;
time;
ngOnInit() {

}
book() {
    this.bookModel.start = new Date(this.model.year, this.model.month -1,this.model.day).getTime();
    this.bookModel.title = this.message;
    this.bookModel.requestor = this.userService.getCurrentUser().username;
    this.bookModel.requestorName = this.userService.getCurrentUser().firstName;
    this.bookModel.advisor = this.bookService.advisor;
    this.bookModel.time = this.time;
    this.bookService.book(this.bookModel).subscribe(() => {
        this.acticeModal.close();
    });
}
}