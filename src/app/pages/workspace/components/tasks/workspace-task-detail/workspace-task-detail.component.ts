import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { WorkspaceService } from '../../../_services/workspace.service';
import { MemberService } from '../../../_services/member.service';
import { TaskService } from '../../../_services/task.service';
import { TaskImportantEnum, TaskModel, getTaskImportantName } from '../../../_models/task.model';
import { CommentModel, tranformTime } from '../../../_models/comment.model';
import { CommentService } from '../../../_services/comment.service';
import * as moment from 'moment';
import { CommonService } from 'src/app/modules/partials/_services/common.service';
import { FileStorageModel } from '../../../_models/work.model';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmDeleteComponent } from 'src/app/modules/partials/components/modal-confirm-delete/modal-confirm-delete.component';

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

  onDelete$: Subject<any> = new Subject<any>();

  tranformTime = tranformTime;

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
    private commonService: CommonService,
    public offCanvas: NgbOffcanvas,
    private bsModalService: BsModalService,
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
      deadline: [this.task?.deadline || null],
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
                u.selectName = u.fullName + ' (tôi)';
              } else {
                u.selectName = u.fullName + ' (' + u.email + ')';
              }
              return u;
            });
            console.log(list);

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

  deleteComment(comment: CommentModel) {
    const initialState = {
      idDelete: comment.id,
      name: comment.content,
    };
    const bsModalRef = this.bsModalService.show(ModalConfirmDeleteComponent, {
      initialState,
    });

    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.commentService.deleteComment(res).subscribe((res) => {
          if (res.success) {
            this.loadComments();
          }
        });
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

  updateAssignee(user: any) {
    if (!user) {
      return;
    }
    this.taskService.updateTask(this.task.id, { assigneeId: user.id }).subscribe((res) => {
      if (res.success) {
        this.task.assignee = user;
      }
    });
  }

  updateTaskDeadline(event: any) {
    if (!event) {
      return;
    }
    const deadline = moment(event).format('YYYY-MM-DD');
    if (deadline === moment(this.form.value.deadline).format('YYYY-MM-DD')) {
      return;
    }
    this.taskService.updateTask(this.task.id, { deadline }).subscribe((res) => {
      if (res) {
        this.task.deadline = event;
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

  show($event) {
    console.log($event);
  }

  deleteFile(fileId: any) {
    this.taskService.deleteFile(this.task.id, fileId).subscribe((res) => {
      if (res.success) {
        this.task.files = this.task.files.filter((file) => file.id !== fileId);
      }
    });
  }

  deleteTask() {
    this.onDelete$.next(this.task);
    this.offCanvas.dismiss('Cross click');
  }

  readURL(event: Event | any) {
    let files: File[] = [];
    if (event.target.files) {
      const f = event.target.files;
      for (let i = 0; i < f.length; i++) {
        const file = f[i];
        files.push(file);
      }
    }
    let data: any = [];
    if (files.length > 0) {
      this.commonService.upLoadFiles(files).subscribe((filePaths) => {
        if (filePaths.length > 0) {
          filePaths.forEach((filePath) => {
            data.push({
              path: filePath.path,
              name: filePath.originalname,
              type: filePath.type,
            });
          });
          this.taskService.addFilesToTask(this.task.id, { files: data }).subscribe((res) => {
            if (res.success) {
              res.files.forEach((file) => {
                const fi = new FileStorageModel();
                fi.setData(file);
                this.task.files.push(fi);
              });
            }
          });
        }
      });
    }
  }
}
