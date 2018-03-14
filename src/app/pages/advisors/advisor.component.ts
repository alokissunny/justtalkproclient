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
  cat = '';

  constructor(private advisorService: AdvisorService, private route: ActivatedRoute, private router : Router ,private userService: UserService) {

  }
  ngOnInit() {
  this.getAdvisors();
  this.route.params.subscribe(params => {
    if(this.cat != params.cat)
    this.getAdvisors();
  });
  this.userService.currentLocationChanged.subscribe( () => {
    this.getAdvisors();
  });  
  this.userService.showLoader.subscribe(() => {
    this.onloading = true;
  })  
  }
  getAdvisors() {
    this.onloading = true;
    this.cat= this.route.snapshot.paramMap.get('cat');
    this.advisorService.getAdvisor(this.cat, this.userService.curLat, this.userService.curLng).subscribe((advisors: any) => {
      this.advisors = advisors;
      this.onloading = false;
      console.log(advisors);
    });
  }
  expertLogin() {
    this.router.navigateByUrl('/loginad')
  }
}
