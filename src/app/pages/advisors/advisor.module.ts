import { NgModule } from '@angular/core';
import {AdvisorComponent} from './advisor.component'
import {AdvisorRoutingModule} from './advisor-routing.module'
@NgModule({
  imports: [
   AdvisorRoutingModule
  ],
  declarations: [
      AdvisorComponent
    
  ]
})
export class AdvisorModule { }