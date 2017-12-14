import { Component, OnInit } from '@angular/core';
import {MessageService} from './message.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'advisors',
  styleUrls: ['./message.component.scss'],
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {

  messages = [];

constructor( private messageService: MessageService,  private route: ActivatedRoute) {

}
  ngOnInit() {
      this.messageService.getAllMessages().subscribe(function(data) {
          this.messages = data;
      });


  }
}
