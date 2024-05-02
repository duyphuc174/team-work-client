import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { ProfileInformationCardComponent } from './profile-information-card/profile-information-card.component';
import { ProfileInformationUpdateComponent } from './profile-information-update/profile-information-update.component';

@NgModule({
  declarations: [ProfileComponent, ProfileInformationComponent, ProfileInformationCardComponent, ProfileInformationUpdateComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
