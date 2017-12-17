import { NgModule } from '@angular/core';
import {AdvisorComponent} from './advisor.component'
import {AdvisorRoutingModule} from './advisor-routing.module'
import { AdvisorCardComponent } from '../../components/advisor-card/advisor-card.component'
import {AdvisorService} from './advisor.service';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import {QueryService} from '../../components/post-query/post-query.service';
import { CommentModule } from 'ng2-comment'; 
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
   AdvisorRoutingModule, CommonModule, ThemeModule,CommentModule
  ],
  declarations: [
      AdvisorComponent, AdvisorCardComponent,
  ],
  providers : [AdvisorService ,QueryService ],
})
export class AdvisorModule {
}
