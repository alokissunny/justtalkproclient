import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../pages/messages/message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-send-reply',
  templateUrl: './send-reply.component.html',
  styleUrls: ['./send-reply.component.scss']
})
export class SendReplyComponent implements OnInit {
  
  message: String;

    constructor(private messageService : MessageService , private activeModal : NgbActiveModal) { }

  ngOnInit() {
  }
  sendQuery() {
    var data = {
      "message" : this.message,
      "repliedBy" : this.messageService.currentUser,
      "repliedOn" : new Date().getTime(),
      "lastUpdatedFrom" : this.messageService.myfirstName
    }
    this.messageService.sendReply(this.messageService.queryID,data).subscribe(() => {
      this.messageService.refreshChannel.next();
    });
    this.activeModal.close();

  }

}
