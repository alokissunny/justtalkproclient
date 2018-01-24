import { Component, OnInit } from '@angular/core';
import {QueryModel} from '../../_models/QueryModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../_services/user.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';


@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss' ],
})
export class PostCommentComponent implements OnInit {
  content = `Query Submitted Successfully!`;
  timeout = 1200;
  toastsLimit = 5;
  type = 'default';
  config: ToasterConfig;

  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
   constructor(private activeModal : NgbActiveModal, private userService: UserService ,
    private toasterService: ToasterService) { }
   ngOnInit() {
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
}
