import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkspaceService } from '../../../_services/workspace.service';
import { WorkspaceModel } from '../../../_models/workspace.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-workspace-create',
  templateUrl: './workspace-create.component.html',
  styleUrls: ['./workspace-create.component.scss'],
})
export class WorkspaceCreateComponent implements OnInit {
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>(null);
  workspace: WorkspaceModel;
  form: FormGroup;
  onClose$: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder, private workspaceService: WorkspaceService, public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const dataForm = this.form.value;
    const data: any = {
      name: dataForm.name,
      description: dataForm.description,
    };

    if (!this.workspace?.id) {
      this.workspaceService.createWorkspace(data).subscribe((workspace) => {
        if (workspace) {
          this.onClose$.next(workspace);
          this.bsModalRef?.hide();
        }
      });
    } else {
      this.workspaceService.updateWorkspace(this.workspace.id, data).subscribe((res) => {
        if (res.success) {
          this.onClose$.next(res.success);
          this.bsModalRef?.hide();
        }
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.workspace?.name ? this.workspace?.name : '', [Validators.required]],
      description: [this.workspace?.description ? this.workspace?.description : ''],
    });
  }

  handleClickCreateButton(ws: any) {
    this.onClick.emit;
  }
}
