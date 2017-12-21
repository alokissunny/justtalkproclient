  import { Component, OnInit, Input } from '@angular/core';
import {QueryModel} from '../../_models/QueryModel';
import {QueryReplyModel} from '../../_models/queryReplyModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SendReplyComponent} from '../send-reply/send-reply.component'

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {
  @Input()
  model : QueryModel;
  replies : Array<QueryReplyModel>;

  getTime(reply: QueryReplyModel) {
     let ret =  new Date(reply.repliedOn as any).toDateString();
     return ret;
  }

  constructor(private modalService : NgbModal) { }

  ngOnInit() {
    this.replies  = new Array<QueryReplyModel>();
    this.prepareReply(this.model.reply);
  }
  prepareReply(reply : QueryReplyModel) {
    if(reply != undefined)
    {
      this.prepareReply(reply.reply);
      this.replies.push(reply);
    }

  }

  openReplyPopup() {
    const activeModal = this.modalService.open(SendReplyComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }

}
