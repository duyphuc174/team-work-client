import { Component, Input, OnInit } from '@angular/core';
import { SprintModel, WorkModel } from '../../_models/workspace.model';
import { WorkService } from '../../_services/work.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WorkspaceWorkCreateComponent } from '../workspace-work-create/workspace-work-create.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-workspace-sprint',
  templateUrl: './workspace-sprint.component.html',
  styleUrls: ['./workspace-sprint.component.scss'],
})
export class WorkspaceSprintComponent implements OnInit {
  @Input() sprint: SprintModel;

  worksSubject: BehaviorSubject<WorkModel[]> = new BehaviorSubject<WorkModel[]>([]);
  works$: Observable<WorkModel[]> = this.worksSubject.asObservable();

  constructor(private workService: WorkService, public dialog: MatDialog) {
    initFlowbite();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.workService.getWorks(this.sprint.id).subscribe((works) => {
      if (works) {
        this.worksSubject.next(works);
      }
    });
  }

  openWorkCreateModal() {
    const dialogRef = this.dialog.open(WorkspaceWorkCreateComponent, {
      data: { sprint: this.sprint },
    });
    dialogRef.afterClosed().subscribe((work) => {
      if (work) {
        this.loadData();
      }
    });
  }
}
