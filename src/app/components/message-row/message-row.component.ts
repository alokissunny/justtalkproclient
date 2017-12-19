import { Component, OnInit, Input ,Output, EventEmitter} from '@angular/core';
import {QueryModel} from '../../_models/QueryModel';
import {MessageService} from '../../pages/messages/message.service';

@Component({
  selector: 'app-message-row',
  templateUrl: './message-row.component.html',
  styleUrls: ['./message-row.component.scss']
})
export class MessageRowComponent implements OnInit {
  @Output()
  delete = new EventEmitter();
  id: String;
  advisor : String;
  subject : String;
  message : String;
  time : Date;
  _dataModel : QueryModel;
  unread : true;
  messageClass : String = "nonread";
    @Input()
    set dataModel (value : QueryModel) {
      this._dataModel = value;
      this.subject = this._dataModel.subject;
      this.message = this._dataModel.message;
      this.advisor = this._dataModel.advisor;
      this.time = new Date(this._dataModel.requestOn as any);
      this.unread = this._dataModel.unread;
      this.id = this._dataModel._id;
      if(this.unread)
      this.messageClass = "nonread";
      else
      this.messageClass ="read";

    }
    get dataModel () : QueryModel {
      return this._dataModel;
    }


  constructor(private messageService : MessageService) { }

  ngOnInit() {
  }
  deleteMessage() {
    this.messageService.deleteMessage(this.id).subscribe(() => {
      this.delete.emit({id: this.id});

    });
  }

}
