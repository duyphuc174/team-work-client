import { Component, HostBinding } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MemberRoleEnum, WorkspaceModel } from 'src/app/pages/workspace/_models/workspace.model';
import { WorkspaceService } from 'src/app/pages/workspace/_services/workspace.service';
import { WorkspaceCreateComponent } from 'src/app/pages/workspace/components/workspaces/workspace-create/workspace-create.component';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  @HostBinding('class') class = 'position-relative';
  workspace: WorkspaceModel;
  constructor(private workspaceService: WorkspaceService, private bsModalService: BsModalService) {
    this.workspaceService.currentWorkspace$.subscribe((w) => {
      if (w) {
        this.workspace = w;
      }
    });
  }

  openWorkspaceViewDetailModal() {
    const role = this.workspaceService.userLoggedRole;
    let initialState = {};
    if (this.workspace) {
      initialState = {
        workspace: this.workspace,
        isViewDetail: true,
        isShowEdit: role !== MemberRoleEnum.MEMBER,
      };
    }
    const bsModalRef = this.bsModalService.show(WorkspaceCreateComponent, { initialState });
    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
      }
    });
  }
}
