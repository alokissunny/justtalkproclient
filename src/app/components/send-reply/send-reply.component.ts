import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../pages/messages/message.service';

@Component({
  selector: 'app-send-reply',
  templateUrl: './send-reply.component.html',
  styleUrls: ['./send-reply.component.scss']
})
export class SendReplyComponent implements OnInit {

    constructor(private messageService : MessageService) { }

  ngOnInit() {
  }

}
