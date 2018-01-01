import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import {CalenderComponent} from './calender.component';
import {CalenderRoutingModule} from './calender.routing.module'
import { CalendarModule } from 'angular-calendar';
import {DemoUtilsModule} from '../../date-utils/module';
import {CalenderService} from './calender.service';
@NgModule({
  imports: [
    CalenderRoutingModule,CommonModule, ThemeModule,
      CalendarModule.forRoot(),
      DemoUtilsModule
  ],
  declarations: [
      CalenderComponent
      
  ],
  providers : [CalenderService],
})
export class CalenderModule {
}
