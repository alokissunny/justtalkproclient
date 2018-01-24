import { Component, OnInit, Input } from '@angular/core';
import {QueryModel} from '../../_models/QueryModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../_services/user.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import {CommentModel} from '../../_models/commentModel';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss' ],
})
export class CommentComponent implements OnInit {
 _comment : CommentModel;
  @Input()
  
  set comment (value :CommentModel)
  {
    this._comment = value;
  }
  get comment() : CommentModel {
    return this._comment;
  }
   constructor(private activeModal : NgbActiveModal, private userService: UserService ,
    private toasterService: ToasterService) { }
   ngOnInit() {

  }
  
    
}
