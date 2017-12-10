import { Component, OnInit } from '@angular/core';
import {AdvisorService} from './advisor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'advisors',
  styleUrls: ['./advisor.component.scss'],
  templateUrl: './advisor.component.html',
})
export class AdvisorComponent implements OnInit {

  advisors = [];

constructor( private advisorService: AdvisorService,  private route: ActivatedRoute) {

}
  ngOnInit() {
      let id = this.route.snapshot.paramMap.get('cat');
   this.advisorService.getAdvisor(id).subscribe((advisors: any) => {
     this.advisors = advisors;
     console.log(advisors);
   });

  }
}
