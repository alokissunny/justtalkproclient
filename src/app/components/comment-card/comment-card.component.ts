import { Component, OnInit } from '@angular/core';
import {QueryModel} from '../../_models/QueryModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../_services/user.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss' ],
})
export class CommentComponent implements OnInit {
   constructor(private activeModal : NgbActiveModal, private userService: UserService ,
    private toasterService: ToasterService) { }
   ngOnInit() {
  }
    
}
