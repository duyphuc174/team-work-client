import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { MemberService } from '../../_services/member.service';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { TaskService } from '../../_services/task.service';
import { WorkspaceService } from '../../_services/workspace.service';

@Component({
  selector: 'app-workspace-task-detail',
  templateUrl: './workspace-task-detail.component.html',
  styleUrls: ['./workspace-task-detail.component.scss'],
})
export class WorkspaceTaskDetailComponent implements OnInit {
  workId: number;
  usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.usersSubject.asObservable();
  userLogged: UserModel;
  form: FormGroup;

  constructor(
    private workspaceService: WorkspaceService,
    private memberService: MemberService,
    private authService: AuthService,
    private fb: FormBuilder,
    private taskService: TaskService,
  ) {
    this.userLogged = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.workspaceService.currentWorkspace$.subscribe((workspace) => {
      if (workspace) {
        this.memberService.getMembersByWorkspaceId(workspace.id).subscribe((members) => {
          if (members) {
            const list = members.map((member) => {
              const u = member.user;
              if (u.id === this.userLogged.id) {
                u.fullName = u.fullName + ' (tôi)';
              }
              return u;
            });
            this.usersSubject.next(list);
          }
        });
      }
    });
  }
}
