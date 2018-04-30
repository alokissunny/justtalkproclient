import { Component, OnInit,Output , AfterViewChecked, ElementRef, ViewChild , EventEmitter , Input, OnChanges} from '@angular/core';
import { ChatService } from './chat.service';
import {UserService} from '../../_services/user.service';
import * as io from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked , OnChanges {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
@Output()
removeChat : EventEmitter<string> = new EventEmitter<string>();
  chats: any;
  joinned: boolean = true;
  newUser = { nickname: '', room: '' };
  msgData = { room: '', nickname: '', message: '' };
  socket = io('http://localhost:4000');
  requestorId;
  @Output()
  showChat = new EventEmitter();
  @Input()
  set advisorId(value) {
    if(value) {
    this._advisorId = value;
    this.requestorId = this.userService.getCurrentUser().username;
    if(this.roomId == undefined)
    this.roomId = this.requestorId+'_'+this.advisorId;
    }
  }

  get advisorId(): any {
    return this._advisorId;
  }
  _advisorId;
  roomId;
  constructor(private chatService: ChatService, private userService : UserService) {}

  ngOnInit() {
    
  }
  ngOnChanges() {
    this.init();
  }
  init() {
    console.log('init');
    var user = {nickname: this.userService.getCurrentUser().firstName, room: this.roomId} ;//JSON.parse(localStorage.getItem("user"));
    if(user!==null) {
      this.getChatByRoom(user.room);
      this.msgData = { room: user.room, nickname: user.nickname, message: '' }
      this.joinned = true;
      this.scrollToBottom();
    }
    this.socket.on('new-message', function (data) {
      if( data.message.room.split('_').indexOf(this.userService.getCurrentUser().username) != -1) {

        this.roomId = data.message.room;
        this.init();
        this.showChat.emit(true);
      }
      console.log('testttt');
      if(data.message.room === this.roomId)  { //JSON.parse(localStorage.getItem("user")).room) {
        this.chats.push(data.message);
        this.msgData = { room: user.room, nickname: user.nickname, message: '' }
        this.scrollToBottom();
      }
    }.bind(this));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  cross() {
this.removeChat.emit();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getChatByRoom(room) {
    this.chatService.getChatByRoom(room).then((res) => {
      this.chats = res;
    }, (err) => {
      console.log(err);
    });
  }

  joinRoom() {
    var date = new Date();
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.getChatByRoom(this.newUser.room);
    this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
  }

  sendMessage() {
    this.chatService.saveChat(this.msgData).then((result) => {
      console.log('saveeee');
      this.socket.emit('save-message', result);
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem("user"));
    this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
    localStorage.removeItem("user");
    this.joinned = false;
  }

}
