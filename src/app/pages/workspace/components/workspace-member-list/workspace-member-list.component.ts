import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../_services/workspace.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberModel, WorkspaceModel, getMemberRoleName, tranformRoleBagdeClass } from '../../_models/workspace.model';
import { WorkspaceMemberAddComponent } from '../workspace-member-add/workspace-member-add.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-workspace-member-list',
  templateUrl: './workspace-member-list.component.html',
  styleUrls: ['./workspace-member-list.component.scss'],
})
export class WorkspaceMemberListComponent implements OnInit {
  workspaceId: number;
  workspace$: Observable<WorkspaceModel> = this.workspaceService.currentWorkspace$;

  membersSubject: BehaviorSubject<MemberModel[]> = new BehaviorSubject<MemberModel[]>([]);
  members$: Observable<MemberModel[]> = this.membersSubject.asObservable();

  transformRoleBagde = tranformRoleBagdeClass;
  getMemberRoleName = getMemberRoleName;

  constructor(
    private workspaceService: WorkspaceService,
    private activedRoute: ActivatedRoute,
    private bsModalService: BsModalService,
  ) {
    this.activedRoute.params.subscribe((params: any) => {
      this.workspaceId = +params.id;
      if (this.workspaceId) {
        this.loadData();
      }
    });
  }

  ngOnInit(): void {}

  loadData() {
    this.workspaceService.getWorkspaceById(this.workspaceId).subscribe((workspace) => {
      this.membersSubject.next(workspace.members);
    });
  }

  openAddMemberModal() {
    const bsModalRef = this.bsModalService.show(WorkspaceMemberAddComponent, {});
    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }
}
