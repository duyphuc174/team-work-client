import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SprintModel } from '../../../_models/sprint.model';
import { WorkService } from '../../../_services/work.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkspaceWorkCreateComponent } from '../../works/workspace-work-create/workspace-work-create.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmDeleteComponent } from 'src/app/modules/partials/components/modal-confirm-delete/modal-confirm-delete.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  WorkModel,
  WorkStatusEnum,
  getImportantColor,
  getImportantIcon,
  getWorkStatusColor,
  getWorkStatusName,
} from '../../../_models/work.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { WorkspaceService } from '../../../_services/workspace.service';
import { MemberRoleEnum, WorkspaceModel } from '../../../_models/workspace.model';

@Component({
  selector: 'app-workspace-sprint',
  templateUrl: './workspace-sprint.component.html',
  styleUrls: ['./workspace-sprint.component.scss'],
})
export class WorkspaceSprintComponent implements OnInit {
  @Input() sprint: SprintModel;
  @Output() handleEdit: EventEmitter<SprintModel> = new EventEmitter<SprintModel>();
  @Output() handleDelete: EventEmitter<SprintModel> = new EventEmitter<SprintModel>();
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  worksSubject: BehaviorSubject<WorkModel[]> = new BehaviorSubject<WorkModel[]>([]);
  works$: Observable<WorkModel[]> = this.worksSubject.asObservable();
  userLogged: UserModel;
  // isAdmin: boolean;
  currentWorkspace: WorkspaceModel;
  memberRoleEnum = MemberRoleEnum;
  workStatusEnum = WorkStatusEnum;
  getImportantColor = getImportantColor;
  getWorkStatusName = getWorkStatusName;
  getWorkStatusColor = getWorkStatusColor;

  params: any = {};
  search: any = {};
  constructor(
    private workService: WorkService,
    private bsModalService: BsModalService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private workspaceService: WorkspaceService,
  ) {
    this.userLogged = this.authService.currentUserValue;
    // const members = this.workspaceService.currentWorksapceSubject.value.members;
    // const u = members.find((m) => m.user.id === this.userLogged.id);
    // if (u.role === MemberRoleEnum.ADMIN || u.role === MemberRoleEnum.CREATOR) {
    //   this.isAdmin = true;
    // } else {
    //   this.isAdmin = false;
    // }
    this.workspaceService.currentWorkspace$.subscribe((workspace) => {
      if (workspace?.id) {
        this.currentWorkspace = workspace;
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoadingSubject.next(true);
    this.workService.getWorks(this.sprint.id, { ...this.search, ...this.params }).subscribe((works) => {
      if (works) {
        this.worksSubject.next(works);
        console.log(works);
      }
      this.isLoadingSubject.next(false);
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

  updateStatusWork(work: WorkModel) {
    const status = work.status;
    const s = status === WorkStatusEnum.OPEN ? WorkStatusEnum.COMPLETE : WorkStatusEnum.OPEN;
    this.workService.updateWork(work.id, { status: s }).subscribe((res) => {
      if (res.success) {
        work.status = s;
      }
    });
  }

  openEditSprintModal() {
    this.handleEdit.emit(this.sprint);
  }

  openDeleteSprintModal() {
    this.handleDelete.emit(this.sprint);
  }

  filterChange(params: any) {
    this.params = params;
    this.loadData();
  }

  searchChange(input: any) {
    const value = input.target.value;
    this.search = { search: value };
    this.loadData();
  }
}
