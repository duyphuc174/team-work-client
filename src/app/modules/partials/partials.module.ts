import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderTitleComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderTitleComponent],
})
export class PartialsModule {}
