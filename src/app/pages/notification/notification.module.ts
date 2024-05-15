import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

@NgModule({
  declarations: [NotificationComponent, NotificationListComponent],
  imports: [CommonModule, NotificationRoutingModule],
})
export class NotificationModule {}
