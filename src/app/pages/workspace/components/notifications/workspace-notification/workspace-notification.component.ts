import { Component } from '@angular/core';
import { WorkspaceService } from '../../../_services/workspace.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationModel } from 'src/app/pages/notification/_models/notification.model';

@Component({
  selector: 'app-workspace-notification',
  templateUrl: './workspace-notification.component.html',
  styleUrls: ['./workspace-notification.component.scss'],
})
export class WorkspaceNotificationComponent {
  unReadNotificationSubject: BehaviorSubject<NotificationModel[]> = new BehaviorSubject<NotificationModel[]>([]);
  unReadNotifications$: Observable<NotificationModel[]> = this.unReadNotificationSubject.asObservable();
  readNotificationSubject: BehaviorSubject<NotificationModel[]> = new BehaviorSubject<NotificationModel[]>([]);
  readNotifications$: Observable<NotificationModel[]> = this.readNotificationSubject.asObservable();

  readCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readCount$: Observable<number> = this.readCountSubject.asObservable();

  unReadCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  unReadCount$: Observable<number> = this.unReadCountSubject.asObservable();

  workspaceName: string;

  constructor(private workspaceService: WorkspaceService, private activedRoute: ActivatedRoute) {
    this.activedRoute.params.subscribe((params: any) => {
      const workspaceId = +params.id;
      if (workspaceId) {
        this.workspaceService.getWorkspaceById(workspaceId).subscribe((workspace) => {
          this.workspaceName = workspace.name;
          this.loadData();
        });
      }
    });
  }

  loadData() {
    this.loadReadNotifications();
    this.loadUnreadNotifications();
  }

  loadUnreadNotifications(params?: any) {
    this.workspaceService.getNotifications(params).subscribe((res) => {
      if (res) {
        const listNoti = this.unReadNotificationSubject.value;
        listNoti.push(...res.notifications);
        this.unReadNotificationSubject.next(listNoti);
        this.unReadCountSubject.next(res.unReadCount);
      }
    });
  }

  loadReadNotifications(params?: any) {
    console.log(params);

    this.workspaceService.getNotifications({ ...params, type: 'read' }).subscribe((res) => {
      if (res) {
        const listNoti = this.readNotificationSubject.value;
        listNoti.push(...res.notifications);
        this.readNotificationSubject.next(listNoti);
        this.readCountSubject.next(res.readCount);
      }
    });
  }
}
