import { NgModule } from '@angular/core';
import {MessageComponent} from './message.component'
import {MessageRoutingModule} from './message.routing.module'
import {MessageService} from './message.service';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import {QueryService} from '../../components/post-query/post-query.service';
import {MessageRowComponent} from '../../components/message-row/message-row.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
   MessageRoutingModule, CommonModule, ThemeModule,
  ],
  declarations: [
      MessageComponent, MessageRowComponent
  ],
  providers : [MessageService ,QueryService ],
})
export class MessageModule {
}
