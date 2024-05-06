import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskModel } from '../../_models/task.model';
import { TaskService } from '../../_services/task.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WorkspaceTaskAddComponent } from '../workspace-task-add/workspace-task-add.component';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { WorkspaceWorkDetailComponent } from '../workspace-work-detail/workspace-work-detail.component';
import { WorkspaceTaskDetailComponent } from '../workspace-task-detail/workspace-task-detail.component';

@Component({
  selector: 'app-workspace-task-list',
  templateUrl: './workspace-task-list.component.html',
  styleUrls: ['./workspace-task-list.component.scss'],
})
export class WorkspaceTaskListComponent implements OnInit {
  @Input() workId: number;
  tasksSubject: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]);
  tasks$: Observable<TaskModel[]> = this.tasksSubject.asObservable();

  constructor(
    private taskService: TaskService,
    private avtivatedRoute: ActivatedRoute,
    private bsModalService: BsModalService,
    private offCanvas: NgbOffcanvas,
  ) {
    this.avtivatedRoute.params.subscribe((params: any) => {
      if (+params.id && !this.workId) {
        this.workId = +params.id;
        this.loadTasks;
      }
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks({ workId: this.workId }).subscribe((tasks) => {
      if (tasks) {
        this.tasksSubject.next(tasks);
        console.log(tasks);
      }
    });
  }

  openModalAddTask() {
    const initialState = {
      workId: this.workId,
    };
    const bsModalRef = this.bsModalService.show(WorkspaceTaskAddComponent, { initialState });
    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.loadTasks();
      }
    });
  }

  openTaskDetail() {
    this.offCanvas.open(WorkspaceTaskDetailComponent, { position: 'end' });
  }
}
