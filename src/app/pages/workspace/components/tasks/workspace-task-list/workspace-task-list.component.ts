import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WorkspaceTaskAddComponent } from '../workspace-task-add/workspace-task-add.component';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { WorkspaceTaskDetailComponent } from '../workspace-task-detail/workspace-task-detail.component';
import { TaskModel, getTaskImportantColor, getTaskImportantName } from '../../../_models/task.model';
import { TaskService } from '../../../_services/task.service';

@Component({
  selector: 'app-workspace-task-list',
  templateUrl: './workspace-task-list.component.html',
  styleUrls: ['./workspace-task-list.component.scss'],
})
export class WorkspaceTaskListComponent implements OnInit {
  @Input() workId: number;
  tasksSubject: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]);
  tasks$: Observable<TaskModel[]> = this.tasksSubject.asObservable();

  getTaskImportantName = getTaskImportantName;
  getTaskImportantColor = getTaskImportantColor;

  constructor(
    private taskService: TaskService,
    private avtivatedRoute: ActivatedRoute,
    private bsModalService: BsModalService,
    private offCanvas: NgbOffcanvas,
    private router: Router,
  ) {
    this.avtivatedRoute.queryParams.subscribe((params: any) => {
      if (+params.taskId) {
        this.taskService.getTaskById(+params.taskId).subscribe((task) => {
          this.openTaskDetail(task);
        });
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

  openTaskDetail(task: TaskModel) {
    const offCanvasRef = this.offCanvas.open(WorkspaceTaskDetailComponent, { position: 'end' });
    offCanvasRef.componentInstance.task = task;
    offCanvasRef.dismissed.subscribe((res) => {
      this.router.navigate([], { queryParams: {} });
    });
  }

  markTaskComplete(task: TaskModel) {
    this.taskService.updateTask(task.id, { completed: !task.completed }).subscribe((res) => {
      if (res) {
        task.completed = !task.completed;
      }
    });
  }
}
