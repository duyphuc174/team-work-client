import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkspaceService } from '../../_services/workspace.service';

@Component({
  selector: 'app-workspace-create',
  templateUrl: './workspace-create.component.html',
  styleUrls: ['./workspace-create.component.scss'],
})
export class WorkspaceCreateComponent implements OnInit {
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>(null);
  workspace: any;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    private workspaceService: WorkspaceService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    console.log(this.form.value);

    if (!this.form.valid) {
      return;
    }
    const dataForm = this.form.value;
    const data: any = {
      name: dataForm.name,
      description: dataForm.description,
    };

    this.workspaceService.createWorkspace(data).subscribe((workspace) => {
      if (workspace) {
        this.closeModal();
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  handleClickCreateButton(ws: any) {
    this.onClick.emit;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
