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
import {ContactCardComponent} from '../../components/contact-card/contact-card.component';
import {ChatComponent} from '../../components/chat/chat.component';
import {ChatService} from '../../components/chat/chat.service';
import { NgChatModule } from 'ng-chat';
import {appConfig} from '../../app.config';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: appConfig.apiUrl, options: {} };

@NgModule({
  imports: [
   AdvisorRoutingModule, CommonModule, ThemeModule,
   NgChatModule,
    SocketIoModule.forRoot(config) 
  ],
  declarations: [
      AdvisorComponent, AdvisorCardComponent,ContactCardComponent ,ChatComponent
  ],
  entryComponents: [
    ContactCardComponent,
  ],
  providers : [AdvisorService ,QueryService ,ChatService],
})
export class AdvisorModule {
}
