import { Component, OnInit, Input } from '@angular/core';
import {QueryModel} from '../../_models/QueryModel';
import {QueryReplyModel} from '../../_models/queryReplyModel';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {
  @Input()
  model : QueryModel;
  replies : Array<QueryReplyModel>;

  constructor() { }

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

}
