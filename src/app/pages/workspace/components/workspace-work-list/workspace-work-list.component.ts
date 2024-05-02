import { Component } from '@angular/core';
import { WorkspaceService } from '../../_services/workspace.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workspace-work-list',
  templateUrl: './workspace-work-list.component.html',
  styleUrls: ['./workspace-work-list.component.scss'],
})
export class WorkspaceWorkListComponent {
  constructor(private workspaceService: WorkspaceService, private activedRoute: ActivatedRoute) {
    this.activedRoute.params.subscribe((params: any) => {
      const workspaceId = +params.id;
      if (workspaceId) {
        this.workspaceService.getWorkspaceById(workspaceId).subscribe((workspace) => {
          console.log(workspace);
        });
      }
    });
  }
}
