/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';
import { NgModel } from '@angular/forms';
import { customHttpProvider } from './_helpers/index';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { NbThemeService } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {PostQueryComponent} from './components/post-query/post-query.component';
import {PostCommentComponent} from './components/comments/comments.components';
import { CommentModule } from 'ng2-comment';
import {SendReplyComponent} from './components/send-reply/send-reply.component';
import {BookComponent} from './components/book-cancel/book-cancel.component';
import {DemoUtilsModule} from './date-utils/module';
import {BookService} from './components/book-cancel/book-cancel.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GoogleService} from './_services/google.service';
import {CommentComponent} from './components/comment-card/comment-card.component';
import {CommentService} from './components/comments/comment.service';
import {UtilityModule} from './utility/utility.module';
import {NewLoginComponent} from './login-new/login.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, PostQueryComponent, SendReplyComponent , NewLoginComponent,
   RegisterComponent , BookComponent , PostCommentComponent ,CommentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,ToasterModule,
    ReactiveFormsModule,
    UtilityModule,
 AgmCoreModule.forRoot({
      apiKey: "AIzaSyDh0cCwo1_WRML-0QYxKP60LkClJC3Tjig",
      libraries: ["places"]
    }),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    DemoUtilsModule
  ],
  bootstrap: [AppComponent],
   entryComponents: [
    PostQueryComponent,SendReplyComponent, BookComponent,PostCommentComponent,CommentComponent
  ],
  providers: [AlertService, AuthenticationService, UserService, customHttpProvider,BookService,NgbActiveModal ,GoogleService,CommentService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
