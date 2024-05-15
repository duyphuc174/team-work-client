import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './components/nav/nav.component';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { NotificationDropdownComponent } from './partials/notification-dropdown/notification-dropdown.component';
import { UserMenuComponent } from './partials/user-menu/user-menu.component';
import { AppsDropdownComponent } from './partials/apps-dropdown/apps-dropdown.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PartialsModule } from '../modules/partials/partials.module';
import { AuthModule } from '../modules/auth/auth.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NotificationItemComponent } from './partials/notification-item/notification-item.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    NotificationDropdownComponent,
    UserMenuComponent,
    AppsDropdownComponent,
    NotificationItemComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, NgbDropdownModule, PartialsModule, AuthModule, TooltipModule],
})
export class LayoutModule {}
