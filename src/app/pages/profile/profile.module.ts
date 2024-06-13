import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { ProfileInformationCardComponent } from './components/profile-information-card/profile-information-card.component';
import { ProfileInformationUpdateComponent } from './components/profile-information-update/profile-information-update.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProfileViewUserComponent } from './components/profile-view-user/profile-view-user.component';
import { ProfileCommonWorkspacesComponent } from './components/profile-common-workspaces/profile-common-workspaces.component';
import { PartialsModule } from 'src/app/modules/partials/partials.module';
import { ProfileUserActivityComponent } from './components/profile-user-activity/profile-user-activity.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInformationComponent,
    ProfileInformationCardComponent,
    ProfileInformationUpdateComponent,
    ProfileViewUserComponent,
    ProfileCommonWorkspacesComponent,
    ProfileUserActivityComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PartialsModule,
    BsDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
  ],
})
export class ProfileModule {}
