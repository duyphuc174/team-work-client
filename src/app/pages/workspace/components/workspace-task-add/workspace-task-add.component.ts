import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WorkspaceService } from '../../_services/workspace.service';
import { MemberService } from '../../_services/member.service';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../_services/task.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-workspace-task-add',
  templateUrl: './workspace-task-add.component.html',
  styleUrls: ['./workspace-task-add.component.scss'],
})
export class WorkspaceTaskAddComponent implements OnInit {
  workId: number;
  usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.usersSubject.asObservable();
  userLogged: UserModel;
  form: FormGroup;

  onClose$: Subject<any> = new Subject<any>();

  constructor(
    private workspaceService: WorkspaceService,
    private memberService: MemberService,
    private authService: AuthService,
    private fb: FormBuilder,
    private taskService: TaskService,
    public bsModalRef: BsModalRef,
  ) {
    this.userLogged = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadMembers();
    this.initForm();
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

  initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      assigneeId: [this.userLogged.id, Validators.required],
    });
  }

  addTask() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    const formSubmit = {
      title: formValue.title,
      assigneeId: formValue.assigneeId,
      workId: this.workId,
    };

    this.taskService.createTask(formSubmit).subscribe((task) => {
      if (task) {
        this.onClose$.next(task);
        this.bsModalRef?.hide();
      }
    });
  }
}
