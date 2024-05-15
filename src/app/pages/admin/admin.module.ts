import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserManagementCreateComponent } from './user-management/user-management-create/user-management-create.component';
import { UserManagementListComponent } from './user-management/user-management-list/user-management-list.component';
import { PartialsModule } from 'src/app/modules/partials/partials.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, UserManagementComponent, UserManagementCreateComponent, UserManagementListComponent],
  imports: [CommonModule, AdminRoutingModule, PartialsModule, NgbDropdownModule, ModalModule, ReactiveFormsModule],
})
export class AdminModule {}
