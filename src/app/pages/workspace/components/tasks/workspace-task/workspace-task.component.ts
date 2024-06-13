import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../../_services/workspace.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel, getTaskImportantColor, getTaskImportantName } from '../../../_models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../../_services/task.service';
import { WorkspaceTaskDetailComponent } from '../workspace-task-detail/workspace-task-detail.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmDeleteComponent } from 'src/app/modules/partials/components/modal-confirm-delete/modal-confirm-delete.component';

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
export class WorkspaceTaskComponent implements OnInit {
  todoListSubjet: BehaviorSubject<{ tasks: TaskModel[]; work: Work }[]> = new BehaviorSubject<any>([]);
  todoList$: Observable<{ tasks: TaskModel[]; work: Work }[]> = this.todoListSubjet.asObservable();
  workspaceId: number;
  getTaskImportantColor = getTaskImportantColor;
  getTaskImportantName = getTaskImportantName;
  form: FormGroup;
  params: any = {
    completed: 'false',
    sortBy: 'important',
  };

  listSelectComplete = [
    {
      value: 'false',
      label: 'Chưa hoàn thành',
    },
    {
      value: null,
      label: 'Tất cả',
    },
  ];

  listSortBy = [
    {
      value: 'important',
      label: 'Độ quan trọng',
    },
    {
      value: 'deadline',
      label: 'Ngày hết hạn',
    },
  ];
  selectCompleteName = 'Chưa hoàn thành';
  constructor(
    private workspaceService: WorkspaceService,
    private activedRoute: ActivatedRoute,
    private offCanvas: NgbOffcanvas,
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private bsModalService: BsModalService,
  ) {
    this.activedRoute.params.subscribe((params: any) => {
      this.workspaceId = +params.id;
      if (this.workspaceId) {
        this.workspaceService.getWorkspaceById(this.workspaceId).subscribe((workspace) => {
          if (workspace?.id) {
            this.loadData();
          } else {
            this.router.navigate(['/workspaces']);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.form.controls['find'].valueChanges.subscribe((value) => {
      if (value) {
        this.params.find = value;
      } else {
        this.params.find = '';
      }
      this.loadData();
    });
  }

  loadData() {
    this.workspaceService.getTasks(this.params).subscribe((tasks) => {
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
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      completed: ['false'],
      sortBy: ['important'],
      find: [''],
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

  filterChange($event) {
    this.loadData();
  }

  filterCompleted($event) {
    if (!$event.value) {
      delete this.params.completed;
    } else {
      this.params.completed = $event.value;
    }
    console.log(this.params);

    this.loadData();
  }

  filterSortBy($event) {
    if (!$event?.value) {
      delete this.params.sortBy;
    } else {
      this.params.sortBy = $event.value;
    }
    console.log(this.params);

    this.loadData();
  }

  deleteTask(task: TaskModel) {
    const initialState = {
      idDelete: task.id,
      name: task.title,
    };
    const bsModalRef = this.bsModalService.show(ModalConfirmDeleteComponent, {
      initialState,
    });
    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.taskService.deleteTask(res).subscribe((res) => {
          if (res?.status) {
            this.loadData();
          }
        });
      }
    });
  }
}
