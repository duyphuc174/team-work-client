import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../_services/workspace.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberModel, WorkspaceModel, tranformRoleBagdeClass } from '../../_models/workspace.model';
import { MatDialog } from '@angular/material/dialog';
import { WorkspaceMemberAddComponent } from '../workspace-member-add/workspace-member-add.component';
import { initFlowbite } from 'flowbite';

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

  constructor(
    private workspaceService: WorkspaceService,
    private activedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.activedRoute.params.subscribe((params: any) => {
      this.workspaceId = +params.id;
      if (this.workspaceId) {
        this.workspaceService.getWorkspaceById(this.workspaceId).subscribe((workspace) => {
          this.membersSubject.next(workspace.members);
        });
      }
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }

  openAddMemberModal() {
    this.dialog.open(WorkspaceMemberAddComponent, { position: { top: '100px' } });
  }
}
