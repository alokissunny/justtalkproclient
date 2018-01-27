import { NgModule } from '@angular/core';
// import { ProfileComponent } from './profile.component'
// import { ProfileRoutingModule } from './profile-routing.module'
// import {ProfileService} from './profile.service';
import { CommonModule } from '@angular/common';
import {FromNowPipe} from '../pipes/from-now';
@NgModule({
    imports: [
         CommonModule ],
    declarations: [FromNowPipe
    ],
    providers: [],
    exports: [FromNowPipe]
})
export class UtilityModule {
}