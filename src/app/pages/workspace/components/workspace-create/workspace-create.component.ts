import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-workspace-create',
  templateUrl: './workspace-create.component.html',
  styleUrls: ['./workspace-create.component.scss'],
})
export class WorkspaceCreateComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>(null);
  workspace: any;

  constructor(private dialogRef: MatDialogRef<WorkspaceCreateComponent>) {}

  handleClickCreateButton(ws: any) {
    this.onClick.emit;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
