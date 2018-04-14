import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {eLoginComponent} from './elogin.component';
const routes: Routes = [{
  path: '',
  component: eLoginComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class eLoginRoutingModule { }

