import { Component } from '@angular/core';
import { WorkspaceService } from '../../_services/workspace.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workspace-work',
  templateUrl: './workspace-work.component.html',
  styleUrls: ['./workspace-work.component.scss'],
})
export class WorkspaceWorkComponent {
  constructor(private workspaceService: WorkspaceService, private activedRoute: ActivatedRoute) {
    this.activedRoute.params.subscribe((params: any) => {
      const workspaceId = +params.id;
      if (workspaceId) {
        this.workspaceService.getWorkspaceById(workspaceId).subscribe((workspace) => {});
      }
    });
  }
}
