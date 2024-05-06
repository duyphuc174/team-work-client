import { Component, ViewChild } from '@angular/core';
import { WorkModel, WorkStatusEnum } from '../../_models/work.model';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from '../../_services/work.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberService } from '../../_services/member.service';
import { MemberModel } from '../../_models/workspace.model';
import { WorkspaceService } from '../../_services/workspace.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WorkspaceTaskAddComponent } from '../workspace-task-add/workspace-task-add.component';
import { TaskService } from '../../_services/task.service';
import { TaskModel } from '../../_models/task.model';

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
  tasksSubject: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]);
  tasks$: Observable<TaskModel[]> = this.tasksSubject.asObservable();

  constructor(
    private avtivatedRoute: ActivatedRoute,
    private workService: WorkService,
    private taskService: TaskService,
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
}
