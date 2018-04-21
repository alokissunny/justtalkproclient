import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {QueryModel}  from '../../_models/QueryModel';
import * as _ from 'lodash';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'messages',
  styleUrls: ['./message.component.scss'],
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {

  messages = [];

  constructor(private messageService: MessageService, private route: ActivatedRoute, private cd: ChangeDetectorRef
  ,private userService : UserService , private router : Router) {

  }
  ngOnInit() {
     if(this.userService.isSessionActive()) {
    this.messageService.refreshChannel.subscribe(() => {
      this.refresh();
    });
    this.refresh();
     }
     else {
        this.router.navigateByUrl('/pages/login');
     }
  }
  refresh() {
this.messageService.getAllMessages().subscribe((data: any) => {
      this.messages = data;
      this.cd.markForCheck();
    });
  }
  removeMessage(evt) {
    let id = evt.id;
    _.remove(this.messages, function(item) {
      return id === item._id;
    })
  }


}
