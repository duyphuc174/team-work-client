import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationModel } from 'src/app/pages/notification/_models/notification.model';
import { NotificationService } from 'src/app/pages/notification/_services/notification.service';

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.scss'],
})
export class NotificationDropdownComponent implements OnInit, OnDestroy {
  notificationsSubject: BehaviorSubject<NotificationModel[]> = new BehaviorSubject<NotificationModel[]>([]);
  notifications$: Observable<NotificationModel[]> = this.notificationsSubject.asObservable();

  unReadCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  unReadCount$: Observable<number> = this.unReadCountSubject.asObservable();

  subr: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // this.subr = setInterval(() => {
    this.loadNotifications();
    // }, 5000);
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe((res) => {
      if (res) {
        this.notificationsSubject.next(res.notifications);
        this.unReadCountSubject.next(res.unReadCount);
        this.notificationService.notificationsSubject.next(res.notifications);
      }
    });
  }

  ngOnDestroy(): void {
    this.subr.unsubscribe();
  }
}
