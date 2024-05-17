import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationModel } from '../../_models/notification.model';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-notification-all',
  templateUrl: './notification-all.component.html',
  styleUrls: ['./notification-all.component.scss'],
})
export class NotificationAllComponent implements OnInit {
  notifications$: Observable<NotificationModel[]>;
  readNotificationSubject: BehaviorSubject<NotificationModel[]> = new BehaviorSubject<NotificationModel[]>([]);
  readNotification$: Observable<NotificationModel[]> = this.readNotificationSubject.asObservable();

  readCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  unReadCount$: Observable<number>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.notifications$ = this.notificationService.notifications$;
    this.loadReadNotifications();
  }

  loadReadNotifications() {
    this.notificationService.getNotifications({ type: 'read' }).subscribe((res) => {
      if (res) {
        this.readNotificationSubject.next(res.notifications);
      }
    });
  }
}
