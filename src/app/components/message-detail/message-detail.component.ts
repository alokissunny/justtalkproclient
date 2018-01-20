  import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {QueryModel} from '../../_models/QueryModel';
import {QueryReplyModel} from '../../_models/queryReplyModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SendReplyComponent} from '../send-reply/send-reply.component'
import {MessageService} from '../../pages/messages/message.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {
  @Input()
  model : QueryModel;
  @Output()
  refresh = new EventEmitter();
  replies : Array<QueryReplyModel>;

  getTime(reply: QueryReplyModel) {
     let ret =  new Date(reply.repliedOn as any).toDateString();
     return ret;
  }

  constructor(private modalService : NgbModal , private messageService : MessageService) { }

  ngOnInit() {
    this.replies  = new Array<QueryReplyModel>();
    this.prepareReply(this.model.reply);
  }
  getReplierName(uid) {
    if(this.messageService.currentUser == uid) 
       return 'you' ;
    else
    return uid;
  }
  prepareReply(reply : QueryReplyModel) {
    if(reply != undefined)
    {
      this.prepareReply(reply.reply);
      this.replies.push(reply);
    }

  }

  openReplyPopup() {
    this.messageService.queryID = this.model._id;
    const activeModal = this.modalService.open(SendReplyComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }

}
