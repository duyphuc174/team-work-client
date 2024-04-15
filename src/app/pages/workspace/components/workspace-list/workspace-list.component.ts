import { Component } from '@angular/core';
import { WorkspaceCreateComponent } from '../workspace-create/workspace-create.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss'],
})
export class WorkspaceListComponent {
  constructor(public dialog: MatDialog) {}
  openWorkspaceCreateModal() {
    this.dialog.open(WorkspaceCreateComponent, { position: { top: '100px' } });
  }
}
