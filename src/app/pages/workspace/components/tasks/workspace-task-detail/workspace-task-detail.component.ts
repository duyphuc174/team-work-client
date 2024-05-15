import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { WorkspaceService } from '../../../_services/workspace.service';
import { MemberService } from '../../../_services/member.service';
import { TaskService } from '../../../_services/task.service';
import { TaskImportantEnum, TaskModel, getTaskImportantName } from '../../../_models/task.model';
import { CommentModel, tranformDateComment } from '../../../_models/comment.model';
import { CommentService } from '../../../_services/comment.service';

@Component({
  selector: 'app-workspace-task-detail',
  templateUrl: './workspace-task-detail.component.html',
  styleUrls: ['./workspace-task-detail.component.scss'],
})
export class WorkspaceTaskDetailComponent implements OnInit {
  workId: number;
  task: TaskModel;
  usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.usersSubject.asObservable();
  userLogged: UserModel;
  form: FormGroup;
  commentsSubject: BehaviorSubject<CommentModel[]> = new BehaviorSubject<CommentModel[]>([]);
  comments$: Observable<CommentModel[]> = this.commentsSubject.asObservable();
  tranformTime = tranformDateComment;

  listImportant = [
    {
      value: TaskImportantEnum.Low,
      label: getTaskImportantName(TaskImportantEnum.Low),
    },
    {
      value: TaskImportantEnum.Medium,
      label: getTaskImportantName(TaskImportantEnum.Medium),
    },
    {
      value: TaskImportantEnum.High,
      label: getTaskImportantName(TaskImportantEnum.High),
    },
  ];

  constructor(
    private workspaceService: WorkspaceService,
    private memberService: MemberService,
    private authService: AuthService,
    private fb: FormBuilder,
    private taskService: TaskService,
    private commentService: CommentService,
  ) {
    this.userLogged = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadMembers();
    this.loadComments();
    if (this.task) {
      this.initForm();
    }
  }

  initForm() {
    this.form = this.fb.group({
      title: [this.task.title],
      description: [this.task?.description || ''],
      assigneeId: [this.task.assignee.id],
      deadline: [this.task.deadline],
      important: [this.task?.important || TaskImportantEnum.Low],
      commentContent: [''],
    });
  }

  loadComments() {
    this.commentService.getCommentsByTaskId(this.task.id).subscribe((comments) => {
      if (comments) {
        this.commentsSubject.next(comments);
      }
    });
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

  control(name: string) {
    return this.form.controls[name];
  }

  sendComment() {
    const content = this.control('commentContent').value;
    if (!content) {
      return;
    }
    this.commentService.createComment(this.task.id, content).subscribe((res) => {
      if (res) {
        this.loadComments();
        this.control('commentContent').setValue('');
      }
    });
  }

  updateTask(name: string, value: any) {
    const dataUpdate = value;
    if (!dataUpdate) {
      return;
    }
    this.taskService.updateTask(this.task.id, { [name]: dataUpdate }).subscribe((res) => {
      if (res) {
        this.task[name] = dataUpdate;
      }
    });
  }

  updateCompleteTask() {
    this.taskService.updateTask(this.task.id, { completed: !this.task.completed }).subscribe((res) => {
      if (res) {
        this.task.completed = !this.task.completed;
      }
    });
  }
}
