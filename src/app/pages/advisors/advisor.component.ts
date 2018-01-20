import { Component, OnInit } from '@angular/core';
import { AdvisorService } from './advisor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../_services/index';

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

  constructor(private advisorService: AdvisorService, private route: ActivatedRoute, private userService: UserService) {

  }
  ngOnInit() {
  this.getAdvisors();
  this.userService.currentLocationChanged.subscribe( () => {
    this.getAdvisors();
  });    
  }
  getAdvisors() {
    this.onloading = true;
    let id = this.route.snapshot.paramMap.get('cat');
    this.advisorService.getAdvisor(id, this.userService.curLat, this.userService.curLng).subscribe((advisors: any) => {
      this.advisors = advisors;
      this.onloading = false;
      console.log(advisors);
    });
  }
}
