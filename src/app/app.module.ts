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
import { NbThemeService } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {PostQueryComponent} from './components/post-query/post-query.component';




@NgModule({
  declarations: [AppComponent, LoginComponent, PostQueryComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
   entryComponents: [
    PostQueryComponent,
  ],
  providers: [AlertService, AuthenticationService, UserService, customHttpProvider,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
