import { Component, Input, OnInit } from '@angular/core';
import { SprintModel } from '../../_models/workspace.model';
import { WorkService } from '../../_services/work.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WorkspaceWorkCreateComponent } from '../workspace-work-create/workspace-work-create.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmDeleteComponent } from 'src/app/modules/partials/components/modal-confirm-delete/modal-confirm-delete.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkModel } from '../../_models/work.model';

@Component({
  selector: 'app-workspace-sprint',
  templateUrl: './workspace-sprint.component.html',
  styleUrls: ['./workspace-sprint.component.scss'],
})
export class WorkspaceSprintComponent implements OnInit {
  @Input() sprint: SprintModel;

  worksSubject: BehaviorSubject<WorkModel[]> = new BehaviorSubject<WorkModel[]>([]);
  works$: Observable<WorkModel[]> = this.worksSubject.asObservable();

  constructor(
    private workService: WorkService,
    private bsModalService: BsModalService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

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

  openWorkCreateModal(work?: WorkModel) {
    let initialState = {
      currentSprint: this.sprint,
    };
    if (work) {
      initialState['work'] = work;
    }
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

  openConfirmDeleteModal(work: WorkModel) {
    const initialState = {
      idDelete: work.id,
      name: work.title,
    };
    const bsModalRef = this.bsModalService.show(ModalConfirmDeleteComponent, {
      initialState,
    });

    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.deleteWork(work.id);
      }
    });
  }

  goToWorkDetail(work: WorkModel) {
    this.router.navigate([work.id], { relativeTo: this.activeRoute });
  }

  deleteWork(workId: number) {
    this.workService.deleteWork(workId).subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }
}
