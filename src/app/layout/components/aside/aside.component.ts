import { Component } from '@angular/core';
import { WorkspaceService } from 'src/app/pages/workspace/_services/workspace.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  workspaceId: number;
  constructor(private workspaceService: WorkspaceService) {
    this.workspaceService.currentWorkspace$.subscribe((workspace) => {
      if (workspace) {
        this.workspaceId = workspace.id;
      }
    });
  }
}
