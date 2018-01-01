import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../_services/user.service';
import {BookService} from './book-cancel.service';
import {BookingModel} from '../../_models/bookingmodel';
@Component({
  selector: 'book-cancel',
  templateUrl: './book-cancel.component.html',
  styleUrls: ['./book-cancel.component.scss']
})
export class BookComponent implements OnInit {
     bookModel : BookingModel; 
    constructor(private bookService : BookService , private userService : UserService) {
        this.bookModel = new BookingModel();
    }

event = {};
message = "";
ngOnInit() {

}
book() {
    this.bookModel.start = this.event["start"].getTime();
    this.bookModel.title = this.message;
    this.bookModel.requestor = this.userService.getCurrentUser().username;
    this.bookModel.advisor = this.bookService.advisor;
    this.bookService.book(this.bookModel).subscribe(() => {
 console.log("booked");
    });
   
}
}