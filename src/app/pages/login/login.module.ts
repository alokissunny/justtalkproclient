import { NgModule } from '@angular/core';
import {LoginComponent} from './login.component'
import {LoginRoutingModule} from './login-routing.module'
import {LoginService} from './login.service';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import {QueryService} from '../../components/post-query/post-query.service';
import {MessageRowComponent} from '../../components/message-row/message-row.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageDetailComponent } from '../../components/message-detail/message-detail.component'; 
import {UtilityModule} from '../../utility/utility.module';

@NgModule({
  imports: [
   LoginRoutingModule, CommonModule, ThemeModule,UtilityModule
  ],
  declarations: [
      LoginComponent,
  ],
  providers : [LoginService  ],
})
export class LoginModule {
}
