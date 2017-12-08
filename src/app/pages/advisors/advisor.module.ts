import { NgModule } from '@angular/core';
import {AdvisorComponent} from './advisor.component'
import {AdvisorRoutingModule} from './advisor-routing.module'
import { AdvisorCardComponent } from '../../components/advisor-card/advisor-card.component'
import {AdvisorService} from './advisor.service';
import { CommonModule } from '@angular/common';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
   AdvisorRoutingModule, CommonModule,
  ],
  declarations: [
      AdvisorComponent, AdvisorCardComponent,
  ],
  providers : [AdvisorService  ],
})
export class AdvisorModule {
}
