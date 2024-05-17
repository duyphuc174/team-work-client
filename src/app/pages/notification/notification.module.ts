import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationListItemComponent } from './components/notification-list-item/notification-list-item.component';
import { NotificationCardComponent } from './components/notification-card/notification-card.component';
import { NotificationAllComponent } from './components/notification-all/notification-all.component';
import { PartialsModule } from 'src/app/modules/partials/partials.module';

@NgModule({
  declarations: [
    NotificationComponent,
    NotificationListComponent,
    NotificationListItemComponent,
    NotificationCardComponent,
    NotificationAllComponent,
  ],
  imports: [CommonModule, NotificationRoutingModule, PartialsModule],
  exports: [NotificationListItemComponent, NotificationListComponent],
})
export class NotificationModule {}
