import { Component, Inject, OnInit } from '@angular/core';
import { ImportantModel, MemberModel, SprintModel } from '../../_models/workspace.model';
import { CommonService } from 'src/app/modules/partials/_services/common.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkService } from '../../_services/work.service';
import { UserService } from 'src/app/modules/auth/_services/user.service';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { MemberService } from '../../_services/member.service';
import { WorkspaceService } from '../../_services/workspace.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-workspace-work-create',
  templateUrl: './workspace-work-create.component.html',
  styleUrls: ['./workspace-work-create.component.scss'],
})
export class WorkspaceWorkCreateComponent implements OnInit {
  importants$: Observable<ImportantModel[]> = new Observable<ImportantModel[]>();
  userLogged: UserModel;
  membersSubject: BehaviorSubject<MemberModel[]> = new BehaviorSubject<MemberModel[]>([]);
  members$: Observable<MemberModel[]> = this.membersSubject.asObservable();
  sprintsSubject: BehaviorSubject<SprintModel[]> = new BehaviorSubject<SprintModel[]>([]);
  sprints$: Observable<SprintModel[]> = this.sprintsSubject.asObservable();
  currentSprint: SprintModel;
  form: FormGroup;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private auth: AuthService,
    private workService: WorkService,
    private memberService: MemberService,
    private workspaceService: WorkspaceService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data.sprint) {
      this.currentSprint = data.sprint;
    } else {
      this.workspaceService.getSprints().subscribe((sprints) => {
        if (sprints) {
          this.sprintsSubject.next(sprints);
        }
      });
    }
  }

  ngOnInit(): void {
    this.userLogged = this.auth.currentUserValue;
    this.loadData();
    this.initForm();
  }

  loadData() {
    this.loadImportants();
    this.loadMembers();
  }

  loadMembers() {
    const workspaceId = this.workspaceService.currentWorksapceSubject.value.id;
    this.memberService.getMembersByWorkspaceId(workspaceId).subscribe((members) => {
      if (members) {
        this.membersSubject.next(members);
      }
    });
  }

  loadImportants() {
    this.importants$ = this.commonService.importants$;
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      importantId: [1, [Validators.required]],
      followerId: [this.userLogged.id, [Validators.required]],
      startDate: [null],
      endDate: [null],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;
    const formSubmit = {
      ...formValue,
      startDate: moment(formValue.startDate).format('YYYY-MM-DD'),
      endDate: moment(formValue.endDate).format('YYYY-MM-DD'),
      sprintId: this.currentSprint.id,
    };

    this.workService.createWork(formSubmit).subscribe((work) => {
      if (work) {
        this.dialogRef.close(work);
      }
    });
  }

  controls(name: string) {
    return this.form.controls[name];
  }
}
