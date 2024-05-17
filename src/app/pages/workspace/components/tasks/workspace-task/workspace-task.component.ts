import { Component } from '@angular/core';
import { WorkspaceService } from '../../../_services/workspace.service';
import { ActivatedRoute } from '@angular/router';
import { TaskModel, getTaskImportantColor, getTaskImportantName } from '../../../_models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../../_services/task.service';
import { WorkspaceTaskDetailComponent } from '../workspace-task-detail/workspace-task-detail.component';

class Work {
  id: number;
  title: string;

  setData(data: any) {
    this.id = data.id;
    this.title = data.title;
  }
}

@Component({
  selector: 'app-workspace-task',
  templateUrl: './workspace-task.component.html',
  styleUrls: ['./workspace-task.component.scss'],
})
export class WorkspaceTaskComponent {
  todoListSubjet: BehaviorSubject<{ tasks: TaskModel[]; work: Work }[]> = new BehaviorSubject<any>([]);
  todoList$: Observable<{ tasks: TaskModel[]; work: Work }[]> = this.todoListSubjet.asObservable();
  getTaskImportantColor = getTaskImportantColor;
  getTaskImportantName = getTaskImportantName;
  constructor(
    private workspaceService: WorkspaceService,
    private activedRoute: ActivatedRoute,
    private offCanvas: NgbOffcanvas,
    private taskService: TaskService,
  ) {
    this.activedRoute.params.subscribe((params: any) => {
      const workspaceId = +params.id;
      if (workspaceId) {
        this.workspaceService.getWorkspaceById(workspaceId).subscribe((workspace) => {
          this.loadData();
        });
      }
    });
  }

  loadData() {
    this.workspaceService.getTasks().subscribe((tasks) => {
      if (tasks) {
        const result = tasks.reduce((acc: any, item: any) => {
          const workId = item.work.id;
          if (!acc[workId]) {
            acc[workId] = {
              work: item.work,
              tasks: [],
            };
          }
          acc[workId].tasks.push(item.task);
          return acc;
        }, {});
        this.todoListSubjet.next(Object.values(result));
        console.log(Object.values(result));
      }
    });
  }

  openTaskDetail(task: TaskModel) {
    const offCanvasRef = this.offCanvas.open(WorkspaceTaskDetailComponent, { position: 'end' });
    offCanvasRef.componentInstance.task = task;
    offCanvasRef.dismissed.subscribe((res) => {
      this.loadData();
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
