import { Component, Input } from '@angular/core';
import { Router }   from '@angular/router';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="on = !on" >
      <div class="icon-container">
        <div  class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title" (click)="clicked($event)">{{ title }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  constructor(private  router: Router ) {}

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  clicked(event) {
   this.router.navigateByUrl('/pages/advisor/'+this.type);
    }
}
