import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { RouterModule } from '@angular/router';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';

@NgModule({
  declarations: [HeaderTitleComponent, ModalHeaderComponent, ModalFooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderTitleComponent, ModalHeaderComponent, ModalFooterComponent],
})
export class PartialsModule {}
