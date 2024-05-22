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
  notificationsSubject: BehaviorSubject<NotificationModel[]> = new BehaviorSubject<NotificationModel[]>([]);
  notifications$: Observable<NotificationModel[]> = this.notificationsSubject.asObservable();
  readNotificationSubject: BehaviorSubject<NotificationModel[]> = new BehaviorSubject<NotificationModel[]>([]);
  readNotification$: Observable<NotificationModel[]> = this.readNotificationSubject.asObservable();

  readCount$: Observable<number>;
  unReadCount$: Observable<number>;

  constructor(private notificationService: NotificationService) {
    this.readCount$ = this.notificationService.readCount$;
    this.unReadCount$ = this.notificationService.unReadCount$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadReadNotifications();
    this.loadUnReadNotifications();
  }

  loadReadNotifications(params?: any) {
    this.notificationService.getNotifications({ ...params, type: 'read' }).subscribe((res) => {
      if (res) {
        const listNoti = this.readNotificationSubject.value;
        listNoti.push(...res.notifications);
        this.readNotificationSubject.next(listNoti);
      }
    });
  }

  loadUnReadNotifications(params?: any) {
    this.notificationService.getNotifications(params).subscribe((res) => {
      if (res) {
        const listNoti = this.notificationsSubject.value;
        listNoti.push(...res.notifications);
        this.notificationsSubject.next(listNoti);
      }
    });
  }
}
