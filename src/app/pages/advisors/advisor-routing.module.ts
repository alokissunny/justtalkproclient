import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdvisorComponent} from './advisor.component';
import {BookComponent} from '../../components/book-cancel/book-cancel.component'




const routes: Routes = [{
  path: '',
  component: AdvisorComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvisorRoutingModule { }

