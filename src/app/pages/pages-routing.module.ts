import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'advisor/:cat',
    loadChildren: './advisors/advisor.module#AdvisorModule',
  },
  {
    path: 'messages',
    loadChildren: './messages/message.module#MessageModule',
  },
    {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },
   {
    path: 'elogin',
    loadChildren: './elogin/elogin.module#eLoginModule',
  },
   
  {
    path: 'profile/:id',
    loadChildren: './profile/profile.module#ProfileModule',
  }, 
  {
    path: 'calender',
    loadChildren: './calender/calender.module#CalenderModule',
  },
  {
    path: '',
    redirectTo: 'advisor/fin',
    pathMatch: 'full',
  }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
