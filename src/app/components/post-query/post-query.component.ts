import { Component, OnInit } from '@angular/core';
import {QueryService} from './post-query.service';
import {QueryModel} from '../../_models/QueryModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../_services/user.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';


@Component({
  selector: 'app-post-query',
  templateUrl: './post-query.component.html',
  styleUrls: ['./post-query.component.scss' ],
})
export class PostQueryComponent implements OnInit {
  advisor :String;
  qm : QueryModel;
  subject :String ;
  message : String;
  
  content = `Query Submitted Successfully!`;
  timeout = 1200;
  toastsLimit = 5;
  type = 'default';
  config: ToasterConfig;

  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
   constructor(private query: QueryService,private activeModal : NgbActiveModal, private userService: UserService ,
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
sendQuery() {
this.qm = new QueryModel();
this.qm.subject = this.subject;
this.qm.message = this.message;
this.qm.requestOn = new Date().getTime();
this.qm.advisor = this.query.advisor;
this.qm.requestor = this.userService.getCurrentUser()['username'];
this.qm.unreadForAdvisor = true;
this.qm.unreadForRequestor = true;
this.qm.lastUpdatedFrom = this.userService.getCurrentUser()['firstName'];
this.query.postQuery(this.qm).subscribe(() => {
   this.showToast(this.type, this.content);
this.activeModal.close();
});

}

  // closeModal() {
  //   this.activeModal.close();
  // }
}
