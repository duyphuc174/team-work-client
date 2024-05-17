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
  notiReadCount: number;
  notiUnReadCount: number;

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
    this.loadReadNotifications({ type: 'read' });
    this.loadUnreadNotifications();
  }

  loadUnreadNotifications(params?: any) {
    this.workspaceService.getNotifications(params).subscribe((res) => {
      if (res) {
        this.unReadNotificationSubject.next(res.notifications);
        this.notiUnReadCount = res.unreadCount;
      }
    });
  }

  loadReadNotifications(params?: any) {
    this.workspaceService.getNotifications(params).subscribe((res) => {
      if (res) {
        this.readNotificationSubject.next(res.notifications);
        this.notiReadCount = res.readCount;
      }
    });
  }
}
