import { NgModule } from '@angular/core';
import {AdvisorComponent} from './advisor.component'
import {AdvisorRoutingModule} from './advisor-routing.module'
import { AdvisorCardComponent } from '../../components/advisor-card/advisor-card.component'
import {AdvisorService} from './advisor.service'
@NgModule({
  imports: [
   AdvisorRoutingModule
  ],
  declarations: [
      AdvisorComponent,AdvisorCardComponent
  ],
  providers : [AdvisorService]
})
export class AdvisorModule { }