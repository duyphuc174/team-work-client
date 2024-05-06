import { Component, HostBinding } from '@angular/core';
import { WorkspaceService } from 'src/app/pages/workspace/_services/workspace.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  @HostBinding('class') class = 'position-relative';
  workspaceId: number;
  constructor(private workspaceService: WorkspaceService) {
    this.workspaceService.currentWorkspace$.subscribe((workspace) => {
      if (workspace) {
        this.workspaceId = workspace.id;
      }
    });
  }
}
