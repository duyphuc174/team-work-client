import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationModel } from '../../_models/notification.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  @Input() title: string = 'Thông báo chưa đọc';
  @Input() notifications: NotificationModel[] = [];
  @Input() isWorkspaceNotification: boolean = false;
  @Input() count: number = 0;
  @Output() handleReadMore = new EventEmitter();
  limit: number = 10;
  offset: number = 0;

  ngOnInit(): void {
    console.log(this.count);
  }

  readNotification(noti: NotificationModel) {
    this.notifications = this.notifications.filter((item) => item.id !== noti.id);
  }

  readMore() {
    this.offset += this.limit;
    this.handleReadMore.emit({ limit: this.limit, offset: this.offset });
  }
}
