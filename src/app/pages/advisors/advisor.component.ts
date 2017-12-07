import { Component, OnInit } from '@angular/core';
import {AdvisorService} from './advisor.service'

@Component({
  selector: 'advisors',
  styleUrls: ['./advisor.component.scss'],
  templateUrl: './advisor.component.html',
})
export class AdvisorComponent implements OnInit {

  advisors = [];

constructor( private advisorService: AdvisorService) {

}
  ngOnInit() {
   this.advisorService.getAdvisor(null).subscribe((advisors) => {
     console.log(advisors);
   })

  }
}
