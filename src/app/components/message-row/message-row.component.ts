import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QueryModel } from '../../_models/QueryModel';
import { MessageService } from '../../pages/messages/message.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-message-row',
  templateUrl: './message-row.component.html',
  styleUrls: ['./message-row.component.scss']
})
export class MessageRowComponent implements OnInit {
  @Output()
  delete = new EventEmitter();
  id: String;
  advisor: String;
  subject: String;
  message: String;
  time: Number;
  _dataModel: QueryModel;
  unread: Boolean;
  messageClass: String = "nonread";
  showDetail: Boolean;
  lastUpdatedFrom: String;
  opponent :String;
  @Input()
  set dataModel(value: QueryModel) {
    
    this._dataModel = value;
  
    this.subject = this._dataModel.subject;
    this.message = this._dataModel.message;
    this.advisor = this._dataModel.advisor;
    this.time = this._dataModel.requestOn;//new Date(this._dataModel.requestOn as any).toDateString();
    this.lastUpdatedFrom = this._dataModel.lastUpdatedFrom;
    if (this.userService.getCurrentUser().username == this._dataModel.advisor) {
      this.unread = this._dataModel.unreadForAdvisor;
    }
    else {
      this.unread = this._dataModel.unreadForRequestor;
    }

    this.id = this._dataModel._id;
    if (this.unread)
      this.messageClass = "nonread";
    else
      this.messageClass = "read";

      this.opponent = this._dataModel.requestor == this.userService.getCurrentUser().username ? this._dataModel.advisor : this._dataModel.requestor;

  }
  get dataModel(): QueryModel {
    return this._dataModel;
  }


  constructor(private messageService: MessageService, private userService: UserService) { }

  ngOnInit() {
  }
  onMessageClick() {
    this.messageService.readMessage(this.id, this.userService.getCurrentUser().username == this._dataModel.requestor).subscribe(() => {
      this.unread = false;
      this.messageClass = "read";
    });
    this.showDetail = !this.showDetail
  }
  deleteMessage() {
    this.messageService.deleteMessage(this.id,this.userService.getCurrentUser().username == this._dataModel.requestor).subscribe(() => {
      this.delete.emit({ id: this.id });

    });
  }


}
