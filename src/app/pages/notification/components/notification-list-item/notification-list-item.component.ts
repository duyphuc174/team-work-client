import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationModel } from '../../_models/notification.model';
import { tranformTime } from 'src/app/pages/workspace/_models/comment.model';
import { NotificationService } from '../../_services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-list-item',
  templateUrl: './notification-list-item.component.html',
  styleUrls: ['./notification-list-item.component.scss'],
})
export class NotificationListItemComponent {
  @Input() notification: NotificationModel;
  @Input() showWorkspaceName: boolean = true;
  tranformTime = tranformTime;

  constructor(private notificationService: NotificationService, private router: Router) {}

  markNotiRead() {
    if (!this.notification.read) {
      this.markRead();
    }
    this.goToLink();
  }

  markRead() {
    this.notificationService.markReadNotification(this.notification.id).subscribe(() => {
      this.notification.read = true;
    });
  }

  goToLink() {
    if (this.notification?.link) {
      switch (this.notification.type) {
        case 'member':
          this.router.navigate([this.notification.link]);
          break;
        case 'task':
          const [path, queryString] = this.notification.link.split('?');
          const pathArray = path.split('/').filter((segment) => segment.length > 0);

          const queryParams = queryString.split('&').reduce((acc, param) => {
            const [key, value] = param.split('=');
            acc[key] = value;
            return acc;
          }, {});
          this.router.navigate(pathArray, { queryParams });
          break;
      }
    }
  }
}
