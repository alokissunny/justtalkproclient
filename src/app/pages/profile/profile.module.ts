import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component'
import { ProfileRoutingModule } from './profile-routing.module'
import {ProfileService} from './profile.service';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { QueryService } from '../../components/post-query/post-query.service';
import { MessageRowComponent } from '../../components/message-row/message-row.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageDetailComponent } from '../../components/message-detail/message-detail.component';
import { FileUploadModule } from 'ng2-file-upload';
import {ProfilePictureComponent } from '../../components/profile-picture/profile-picture.component';
import {GoogleService} from '../../_services/google.service';
import {RepeaterComponent} from '../../components/repeater/repeater.component';
//import { Ng2FileInputModule } from 'ng2-file-input';


@NgModule({
    imports: [
        ProfileRoutingModule, CommonModule, ThemeModule, FileUploadModule //Ng2FileInputModule.forRoot() 
    ],
    declarations: [
        ProfileComponent,ProfilePictureComponent,RepeaterComponent
    ],
    providers: [ProfileService,GoogleService],
})
export class ProfileModule {
}