import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { RouterModule } from '@angular/router';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { UserAvatarInforComponent } from './components/user-avatar-infor/user-avatar-infor.component';
import { SelectUserComponent } from './components/select-user/select-user.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalConfirmDeleteComponent } from './components/modal-confirm-delete/modal-confirm-delete.component';

@NgModule({
  declarations: [
    HeaderTitleComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    UserAvatarInforComponent,
    SelectUserComponent,
    ModalConfirmDeleteComponent,
  ],
  imports: [CommonModule, RouterModule, TooltipModule],
  exports: [
    HeaderTitleComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    UserAvatarInforComponent,
    SelectUserComponent,
  ],
})
export class PartialsModule {}
