import { Component, Input } from '@angular/core';
import { NotificationModel } from '../../_models/notification.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent {
  @Input() title: string = 'Thông báo chưa đọc';
  @Input() notifications: NotificationModel[] = [];
  @Input() isWorkspaceNotification: boolean = false;

  readNotification(noti: NotificationModel) {
    this.notifications = this.notifications.filter((item) => item.id !== noti.id);
  }
}
