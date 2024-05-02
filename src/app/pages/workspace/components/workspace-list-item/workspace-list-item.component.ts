import { Component, Input } from '@angular/core';
import { WorkspaceModel } from '../../_models/workspace.model';

@Component({
  selector: 'app-workspace-list-item',
  templateUrl: './workspace-list-item.component.html',
  styleUrls: ['./workspace-list-item.component.scss'],
})
export class WorkspaceListItemComponent {
  @Input() workspace: WorkspaceModel;
  @Input() index: number;
}
