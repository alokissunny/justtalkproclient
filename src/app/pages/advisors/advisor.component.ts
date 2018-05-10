import { Component, OnInit } from '@angular/core';
import { AdvisorService } from './advisor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../_services/index';
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from './socketio-adapter'
import { Socket } from 'ng-socket-io';
import { Http } from '@angular/http';
import { ChatModel} from './ChatModel';
import {CATMAP} from '../../constants';

@Component({
  selector: 'advisors',
  styleUrls: ['./advisor.component.scss'],
  templateUrl: './advisor.component.html',
})
export class AdvisorComponent implements OnInit {

  advisors = [];
  lat: Number;
  lng: Number;
  onloading = true;
  cat = '';
  showChat = true;
  advisorId;
  currentUserInfo: ChatModel = new ChatModel();


  constructor(private socket: Socket, private http: Http, private advisorService: AdvisorService, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.InitializeSocketListerners();
  }
  chat(evt) {
    this.advisorId = evt.advisor;
    this.showChat = false;
  }
  remove() {
    this.showChat = true;
  }
  ngOnInit() {
    this.getAdvisors();
    this.route.params.subscribe(params => {
      if (this.cat != params.cat)
        this.getAdvisors();
    });
    this.userService.currentLocationChanged.subscribe(() => {
      this.getAdvisors();
    });
    this.userService.showLoader.subscribe(() => {
      this.onloading = true;
    })
    this.username = this.userService.getCurrentUser().username;
    this.joinRoom();
  }
  getAdvisors() {
    this.onloading = true;
    this.cat = this.route.snapshot.paramMap.get('cat');
    this.advisorService.getAdvisor(this.cat, this.userService.curLat, this.userService.curLng).subscribe((advisors: any) => {
      this.advisors = advisors;
      this.onloading = false;
      console.log(advisors);
    });
  }
  expertLogin() {
    this.router.navigateByUrl('/loginad')
  }
  userId: string;
  username: string;

  public adapter: SocketIOAdapter;



  public joinRoom(): void {
    this.currentUserInfo.username = this.username;
    this.currentUserInfo.displayName = this.userService.getCurrentUser().firstName;
    this.currentUserInfo.isExpert = this.userService.isLoginUserAdvisor();
    this.currentUserInfo.expertCat = this.cat;
    this.socket.emit("join", this.currentUserInfo);
  }

  public InitializeSocketListerners(): void {
    this.socket.on("generatedUserId", (userId) => {
      // Initializing the chat with the userId and the adapter with the socket instance
      this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
      this.adapter.catFilter = this.cat;
      this.userId = userId;
    });
  }
  getTitle(){
    return CATMAP[this.cat]+" Advisors"
  }
}
