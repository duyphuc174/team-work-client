import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { ProfileViewUserComponent } from './components/profile-view-user/profile-view-user.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'me',
        component: ProfileInformationComponent,
      },
      {
        path: ':id',
        component: ProfileViewUserComponent,
      },
      {
        path: '',
        redirectTo: 'me',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
