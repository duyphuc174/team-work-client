import { Component, OnInit } from '@angular/core';
import { WorkspaceCreateComponent } from '../workspace-create/workspace-create.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WorkspaceService } from '../../_services/workspace.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkspaceModel } from '../../_models/workspace.model';
import { Router } from '@angular/router';

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

  constructor(public dialog: MatDialog, private workspaceService: WorkspaceService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
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

  openWorkspaceCreateModal() {
    this.dialog.open(WorkspaceCreateComponent, { position: { top: '100px' } });
  }
}
