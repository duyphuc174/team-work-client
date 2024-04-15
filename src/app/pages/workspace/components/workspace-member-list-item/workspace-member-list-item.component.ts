import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-workspace-member-list-item',
  templateUrl: './workspace-member-list-item.component.html',
  styleUrls: ['./workspace-member-list-item.component.scss'],
})
export class WorkspaceMemberListItemComponent {
  @HostBinding('class') class = 'd-content';
}
