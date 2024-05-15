import { Component, ViewChild } from '@angular/core';
import { WorkModel, WorkStatusEnum, getWorkStatusName } from '../../../_models/work.model';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from '../../../_services/work.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskService } from '../../../_services/task.service';
import { TaskModel } from '../../../_models/task.model';
import { CommonService } from 'src/app/modules/partials/_services/common.service';

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
  constructor(
    private avtivatedRoute: ActivatedRoute,
    private workService: WorkService,
    private taskService: TaskService,
    private commonService: CommonService,
  ) {
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
      if (work) {
        this.workSubject.next(work);
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
