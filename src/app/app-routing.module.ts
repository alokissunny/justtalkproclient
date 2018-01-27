import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {LoginComponent} from './login/index';
import {NewLoginComponent} from './login-new/login.component';
import {RegisterComponent} from './register/register.component';
import {AdvisorLoginComponent} from './advisor-login/advisor-login.component';
const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  { path: 'login',
    component : NewLoginComponent  
  },
  { path: 'logina',
    component : LoginComponent  
  },
    { path: 'loginad',
    component : AdvisorLoginComponent  
  },
   {
        path: 'register',
        component: RegisterComponent,
      },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
