import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {QueryModel}  from '../../_models/QueryModel';

@Component({
  selector: 'messages',
  styleUrls: ['./message.component.scss'],
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {

  messages = [];

  constructor(private messageService: MessageService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {

  }
  ngOnInit() {
    this.messageService.getAllMessages().subscribe((data: any) => {
      this.messages = data;
      this.cd.markForCheck();
    });
  }
//   prepareData(message : any) {
//  let ret : QueryModel = new QueryModel();
//  ret.subject = message;

//   }
}
