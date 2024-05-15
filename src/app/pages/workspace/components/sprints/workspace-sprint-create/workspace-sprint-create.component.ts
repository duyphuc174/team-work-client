import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SprintService } from '../../../_services/sprint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { WorkspaceService } from '../../../_services/workspace.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SprintModel } from '../../../_models/sprint.model';

@Component({
  selector: 'app-workspace-sprint-create',
  templateUrl: './workspace-sprint-create.component.html',
  styleUrls: ['./workspace-sprint-create.component.scss'],
})
export class WorkspaceSprintCreateComponent implements OnInit {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  workspaceId: number;
  sprint: SprintModel;
  form: FormGroup;
  onClose$: Subject<any> = new Subject<any>();

  constructor(
    private sprintService: SprintService,
    private workspaceService: WorkspaceService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
  ) {
    this.workspaceId = this.workspaceService.currentWorksapceSubject.value.id;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const currentDate = new Date();
    const endDate = moment(currentDate).add(30, 'days').toDate();

    this.form = this.fb.group({
      name: [this.sprint?.id ? this.sprint?.name : '', Validators.required],
      startDate: [this.sprint?.id ? this.sprint?.startDate : currentDate],
      endDate: [this.sprint?.id ? this.sprint?.endDate : endDate],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;
    let formSubmit: any = {
      name: formValue.name,
      startDate: moment(formValue.startDate).format('YYYY-MM-DD'),
      endDate: moment(formValue.endDate).format('YYYY-MM-DD'),
    };
    this.isLoadingSubject.next(true);
    if (!this.sprint?.id) {
      formSubmit.workspaceId = this.workspaceId;
      this.sprintService.createSprint(formSubmit).subscribe((res) => {
        if (res) {
          this.onClose$.next(res);
          this.bsModalRef?.hide();
        }
        this.isLoadingSubject.next(false);
      });
    } else {
      this.sprintService.updateSprint(this.sprint.id, formSubmit).subscribe((res) => {
        if (res) {
          this.onClose$.next(res);
          this.bsModalRef?.hide();
        }
        this.isLoadingSubject.next(false);
      });
    }
  }
}
