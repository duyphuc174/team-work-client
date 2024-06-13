import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../../_services/workspace.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SprintModel } from '../../../_models/sprint.model';
import { SprintService } from '../../../_services/sprint.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WorkspaceSprintCreateComponent } from '../../sprints/workspace-sprint-create/workspace-sprint-create.component';
import { ModalConfirmDeleteComponent } from 'src/app/modules/partials/components/modal-confirm-delete/modal-confirm-delete.component';
import { MemberRoleEnum, WorkspaceModel } from '../../../_models/workspace.model';

@Component({
  selector: 'app-workspace-work-list',
  templateUrl: './workspace-work-list.component.html',
  styleUrls: ['./workspace-work-list.component.scss'],
})
export class WorkspaceWorkListComponent implements OnInit {
  sprintsSubject: BehaviorSubject<SprintModel[]> = new BehaviorSubject<SprintModel[]>([]);
  sprints$: Observable<SprintModel[]> = this.sprintsSubject.asObservable();
  currentWorkspace: WorkspaceModel;
  memberRoleEnum = MemberRoleEnum;

  constructor(
    private workspaceService: WorkspaceService,
    private sprintService: SprintService,
    private bsModalService: BsModalService,
  ) {
    this.workspaceService.currentWorkspace$.subscribe((workspace) => {
      if (workspace?.id) {
        this.loadData();
        this.currentWorkspace = workspace;
        console.log(this.currentWorkspace.myInfo);
      }
    });
  }

  ngOnInit(): void {}

  loadData() {
    this.workspaceService.getSprints().subscribe((sprints) => {
      if (sprints) {
        this.sprintsSubject.next(sprints);
      }
    });
  }

  openModalCreateSprint(sprint?: SprintModel) {
    let initialState = {};
    if (sprint) {
      initialState = {
        sprint,
      };
    }

    const bsModalRef = this.bsModalService.show(WorkspaceSprintCreateComponent, { initialState });
    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }

  openModalConfirmDelete(sprint: SprintModel) {
    const initialState = {
      idDelete: sprint.id,
      name: sprint.name,
    };
    const bsModalRef = this.bsModalService.show(ModalConfirmDeleteComponent, {
      initialState,
    });
    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.sprintService.deleteSprint(sprint.id).subscribe((res) => {
          if (res) {
            this.loadData();
          }
        });
      }
    });
  }
}
