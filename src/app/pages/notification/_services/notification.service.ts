import { Injectable } from '@angular/core';
import { NotificationHttpService } from './notification-http.service';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { NotificationModel } from '../_models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // Danh sách thông báo chưa đọc
  notificationsSubject: BehaviorSubject<NotificationModel[]> = new BehaviorSubject<NotificationModel[]>([]);
  notifications$: Observable<NotificationModel[]> = this.notificationsSubject.asObservable();
  // Tổng thông báo chưa đọc
  unReadCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  unReadCount$: Observable<number> = this.unReadCountSubject.asObservable();
  // Tổng thông báo đã đọc
  readCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readCount$: Observable<number> = this.readCountSubject.asObservable();

  constructor(private notificationHttpService: NotificationHttpService) {}

  getNotifications(params?: any): Observable<any> {
    return this.notificationHttpService.getNotifications(params).pipe(
      map((res) => {
        const notifications = res.notifications.map((notification) => {
          const noti = new NotificationModel();
          noti.setData(notification);
          return noti;
        });

        return { notifications, readCount: res.readCount, unReadCount: res.unReadCount };
      }),
      catchError((err) => of(err)),
    );
  }

  markReadNotification(id: number): Observable<any> {
    return this.notificationHttpService.markReadNotification(id).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => of(err)),
    );
  }
}
