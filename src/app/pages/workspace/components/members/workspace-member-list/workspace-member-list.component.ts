import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../../_services/workspace.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  MemberModel,
  MemberRoleEnum,
  WorkspaceModel,
  getMemberRoleName,
  tranformRoleBagdeClass,
} from '../../../_models/workspace.model';
import { WorkspaceMemberAddComponent } from '../workspace-member-add/workspace-member-add.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { MemberService } from '../../../_services/member.service';

@Component({
  selector: 'app-workspace-member-list',
  templateUrl: './workspace-member-list.component.html',
  styleUrls: ['./workspace-member-list.component.scss'],
})
export class WorkspaceMemberListComponent implements OnInit {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  workspaceId: number;
  workspace$: Observable<WorkspaceModel> = this.workspaceService.currentWorkspace$;
  membersSubject: BehaviorSubject<MemberModel[]> = new BehaviorSubject<MemberModel[]>([]);
  members$: Observable<MemberModel[]> = this.membersSubject.asObservable();
  userLogged: UserModel;
  params: any;

  isSelectUsers: boolean = false;
  selectedMemberIds: number[] = [];

  transformRoleBagde = tranformRoleBagdeClass;
  getMemberRoleName = getMemberRoleName;
  memberRole = MemberRoleEnum;
  currentUserRole: MemberRoleEnum;

  constructor(
    private workspaceService: WorkspaceService,
    private activedRoute: ActivatedRoute,
    private bsModalService: BsModalService,
    private authService: AuthService,
    private memberService: MemberService,
  ) {
    this.userLogged = this.authService.currentUserValue;
    this.activedRoute.params.subscribe((params: any) => {
      this.workspaceId = +params.id;
      if (this.workspaceId) {
        this.loadData();
      }
    });
  }

  ngOnInit(): void {}

  loadData() {
    this.isLoadingSubject.next(true);
    this.workspaceService.getWorkspaceById(this.workspaceId).subscribe((workspace) => {
      if (workspace) {
        const members = workspace.members;
        this.membersSubject.next(members);
        const m = members.find((m) => m.user.id === this.userLogged.id);
        if (m) {
          this.currentUserRole = m.role;
        }
      }
      this.isLoadingSubject.next(false);
    });
  }

  loadMembers($event: any) {
    const find = $event.target.value;
    this.memberService.getMembersByWorkspaceId(this.workspaceId, { find }).subscribe((members) => {
      if (members) {
        this.membersSubject.next(members);
        const m = members.find((m) => m.user.id === this.userLogged.id);
        if (m) {
          this.currentUserRole = m.role;
        }
      }
      this.isLoadingSubject.next(false);
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

  openSelectUsers() {
    if (this.isSelectUsers) {
      this.isSelectUsers = false;
      this.selectedMemberIds = [];
    } else {
      this.isSelectUsers = true;
    }
  }

  grantRole(memberId: number, role: MemberRoleEnum) {
    this.memberService.updateRole(memberId, role).subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }

  selectUser(id: number) {
    const findId = this.selectedMemberIds.indexOf(id);
    if (findId > -1) {
      this.selectedMemberIds.splice(findId, 1);
    } else {
      this.selectedMemberIds.push(id);
    }
  }

  deleteMuiltipleMembers() {
    this.deleteMembers(this.selectedMemberIds);
    this.selectedMemberIds = [];
  }

  deleteMembers(listId: number[]) {
    const memberIds = listId;
    this.memberService.deleteMembers(this.workspaceId, memberIds).subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }
}
