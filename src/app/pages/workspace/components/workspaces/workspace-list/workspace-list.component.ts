import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../../_services/workspace.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkspaceModel } from '../../../_models/workspace.model';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmDeleteComponent } from 'src/app/modules/partials/components/modal-confirm-delete/modal-confirm-delete.component';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { WorkspaceCreateComponent } from '../workspace-create/workspace-create.component';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss'],
})
export class WorkspaceListComponent implements OnInit {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  workspacesSubject: BehaviorSubject<WorkspaceModel[]> = new BehaviorSubject<WorkspaceModel[]>([]);
  workspaces$: Observable<WorkspaceModel[]> = this.workspacesSubject.asObservable();

  userLogged: UserModel;

  constructor(
    private workspaceService: WorkspaceService,
    private router: Router,
    private bsModalService: BsModalService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.userLogged = this.authService.currentUserValue;
  }

  loadData() {
    this.isLoadingSubject.next(true);
    this.workspaceService.getWorkspaces().subscribe((worksapces) => {
      if (worksapces) {
        this.workspacesSubject.next(worksapces);
      }
      this.isLoadingSubject.next(false);
    });
  }

  goToWorkspace(workspaceId: number) {
    this.router.navigate([`/workspaces/${workspaceId}`]);
  }

  openWorkspaceCreateModal(workspace?: WorkspaceModel) {
    let initialState = {};
    if (workspace) {
      initialState = {
        workspace: workspace,
      };
    }
    const bsModalRef = this.bsModalService.show(WorkspaceCreateComponent, { initialState });
    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }

  openModalConfirmDelete(workspace: WorkspaceModel) {
    const initialState = {
      idDelete: workspace.id,
      name: workspace.name,
    };
    const bsModalRef = this.bsModalService.show(ModalConfirmDeleteComponent, { initialState });
    bsModalRef.content.onClose$.subscribe((id) => {
      if (id) {
        this.workspaceService.deleteWorkspace(id).subscribe((res) => {
          if (res.success) {
            this.loadData();
          }
        });
      }
    });
  }
}
