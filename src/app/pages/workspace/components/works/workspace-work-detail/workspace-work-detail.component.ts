import { Component, ViewChild } from '@angular/core';
import { WorkModel, WorkStatusEnum, getWorkStatusName } from '../../../_models/work.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkService } from '../../../_services/work.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskService } from '../../../_services/task.service';
import { TaskModel } from '../../../_models/task.model';
import { CommonService } from 'src/app/modules/partials/_services/common.service';
import { WorkspaceWorkCreateComponent } from '../workspace-work-create/workspace-work-create.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { MemberRoleEnum } from '../../../_models/workspace.model';
import { WorkspaceService } from '../../../_services/workspace.service';

@Component({
  selector: 'app-workspace-work-detail',
  templateUrl: './workspace-work-detail.component.html',
  styleUrls: ['./workspace-work-detail.component.scss'],
})
export class WorkspaceWorkDetailComponent {
  workId: number;
  workSubject: BehaviorSubject<WorkModel> = new BehaviorSubject<WorkModel>(null);
  work$: Observable<WorkModel> = this.workSubject.asObservable();
  workStatus = WorkStatusEnum;
  getWorkStatusName = getWorkStatusName;
  tasksSubject: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]);
  tasks$: Observable<TaskModel[]> = this.tasksSubject.asObservable();
  userLogged: UserModel;
  userLoggedMemberRole: MemberRoleEnum;
  memberRole = MemberRoleEnum;
  constructor(
    private avtivatedRoute: ActivatedRoute,
    private workService: WorkService,
    private taskService: TaskService,
    private commonService: CommonService,
    private bsModalService: BsModalService,
    private authService: AuthService,
    private workspaceService: WorkspaceService,
    private router: Router,
  ) {
    this.userLogged = this.authService.currentUserValue;
    this.workspaceService.currentWorkspace$.subscribe((workspace) => {
      if (workspace) {
        const members = workspace.members;
        const m = members.find((m) => m.user.id === this.userLogged.id);
        if (m) {
          this.userLoggedMemberRole = m.role;
        }
      } else {
      }
    });
    this.avtivatedRoute.params.subscribe((params: any) => {
      if (+params.id) {
        this.workId = +params.id;
        this.loadData();
      }
    });
  }

  loadData() {
    this.loadWork();
  }

  loadWork() {
    this.workService.getWorkById(this.workId).subscribe((work) => {
      if (work?.id) {
        this.workSubject.next(work);
      } else {
        this.router.navigate([`/workspaces/${this.workspaceService.currentWorksapceSubject.value.id}/works`]);
      }
    });
  }

  loadTasks() {
    this.taskService.getTasks({ workId: this.workId }).subscribe((tasks) => {
      if (tasks) {
        this.tasksSubject.next(tasks);
        console.log(tasks);
      }
    });
  }

  updateWorkStatus(status: WorkStatusEnum) {
    const w = this.workSubject.value;
    if (w.status === status) {
      return;
    }

    this.workService.updateWork(this.workId, { status }).subscribe((res) => {
      if (res.success) {
        w.status = status;
        this.workSubject.next(w);
      }
    });
  }

  openWorkCreateModal() {
    let initialState = {
      work: this.workSubject.value,
    };

    const bsModalRef = this.bsModalService.show(WorkspaceWorkCreateComponent, {
      initialState,
      class: 'modal-fullscreen-xl-down modal-lg',
    });

    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }

  deleteFile(fileId: any) {
    this.workService.deleteFile(this.workId, fileId).subscribe((res) => {
      if (res.success) {
        this.loadWork();
      }
    });
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
          this.workService.addFilesToWork(this.workId, { files: data }).subscribe((res) => {
            if (res.success) {
              this.loadWork();
            }
          });
        }
      });
    }
  }
}
