import { Component, OnInit } from '@angular/core';
import {QueryService} from './post-query.service';
import {QueryModel} from '../../_models/QueryModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../_services/user.service';


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
   constructor(private query: QueryService,private activeModal : NgbActiveModal, private userService: UserService) { }
   ngOnInit() {
  }
sendQuery(){
this.qm = new QueryModel();
this.qm.subject = this.subject;
this.qm.message = this.message;
this.qm.requestOn = new Date().getTime();
this.qm.advisor = this.query.advisor;
this.qm.requestor = this.userService.getCurrentUser()["username"];
this.qm.unreadForAdvisor = true;
this.qm.unreadForRequestor = true;
this.query.postQuery(this.qm).subscribe(() => {
alert("Query submitted succefully");
this.activeModal.close();
});

}

  // closeModal() {
  //   this.activeModal.close();
  // }
}
