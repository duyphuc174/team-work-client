import { Component, HostBinding } from '@angular/core';
import { WorkspaceModel } from 'src/app/pages/workspace/_models/workspace.model';
import { WorkspaceService } from 'src/app/pages/workspace/_services/workspace.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  @HostBinding('class') class = 'position-relative';
  workspace: WorkspaceModel;
  constructor(private workspaceService: WorkspaceService) {
    this.workspaceService.currentWorkspace$.subscribe((w) => {
      if (w) {
        this.workspace = w;
      }
    });
  }
}
