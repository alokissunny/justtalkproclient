import { NgModule } from '@angular/core';
import {eLoginComponent} from './elogin.component'
import {eLoginRoutingModule} from './elogin-routing.module'
import {eLoginService} from './elogin.service';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import {QueryService} from '../../components/post-query/post-query.service';
import {MessageRowComponent} from '../../components/message-row/message-row.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageDetailComponent } from '../../components/message-detail/message-detail.component'; 
import {UtilityModule} from '../../utility/utility.module';

@NgModule({
  imports: [
   eLoginRoutingModule, CommonModule, ThemeModule,UtilityModule
  ],
  declarations: [
      eLoginComponent,
  ],
  providers : [eLoginService  ],
})
export class eLoginModule {
}
