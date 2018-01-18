import { Component, OnInit } from '@angular/core';
import { AdvisorService } from './advisor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(private advisorService: AdvisorService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('cat');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.advisorService.getAdvisor(id, this.lat, this.lng).subscribe((advisors: any) => {
            this.advisors = advisors;
            this.onloading =false;
            console.log(advisors);
          });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
         this.advisorService.getAdvisor(id).subscribe((advisors: any) => {
            this.advisors = advisors;
            this.onloading =false;
            console.log(advisors);
          });
      }
    
  }
}
