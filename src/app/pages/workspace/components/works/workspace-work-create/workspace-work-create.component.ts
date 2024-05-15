import { Component, Inject, OnInit } from '@angular/core';
import { ImportantModel, MemberModel } from '../../../_models/workspace.model';
import { CommonService } from 'src/app/modules/partials/_services/common.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkService } from '../../../_services/work.service';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { MemberService } from '../../../_services/member.service';
import { WorkspaceService } from '../../../_services/workspace.service';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { WorkModel } from '../../../_models/work.model';
import { SprintModel } from '../../../_models/sprint.model';

@Component({
  selector: 'app-workspace-work-create',
  templateUrl: './workspace-work-create.component.html',
  styleUrls: ['./workspace-work-create.component.scss'],
})
export class WorkspaceWorkCreateComponent implements OnInit {
  work: WorkModel;
  importants$: Observable<ImportantModel[]> = new Observable<ImportantModel[]>();
  userLogged: UserModel;
  membersSubject: BehaviorSubject<MemberModel[]> = new BehaviorSubject<MemberModel[]>([]);
  members$: Observable<MemberModel[]> = this.membersSubject.asObservable();
  sprintsSubject: BehaviorSubject<SprintModel[]> = new BehaviorSubject<SprintModel[]>([]);
  sprints$: Observable<SprintModel[]> = this.sprintsSubject.asObservable();
  currentSprint: SprintModel;
  followers: UserModel[] = [];
  onClose$: Subject<any> = new Subject<any>();
  form: FormGroup;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private auth: AuthService,
    private workService: WorkService,
    private memberService: MemberService,
    private workspaceService: WorkspaceService,
    public bsModalRef: BsModalRef,
  ) {
    if (!this.currentSprint) {
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
    this.importants$.subscribe((importants) => {
      console.log(importants);
    });
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
        this.followers = members.map((member) => {
          const u = member.user;
          if (u.id === this.userLogged.id) {
            u.fullName = u.fullName + ' (tôi)';
          }
          return u;
        });
      }
    });
  }

  loadImportants() {
    this.importants$ = this.commonService.importants$;
  }

  initForm() {
    this.form = this.fb.group({
      title: [this.work?.title || '', [Validators.required]],
      description: [this.work?.description || ''],
      importantId: [this.work?.important?.id || 1, [Validators.required]],
      followerId: [this.work?.follower?.id || this.userLogged.id, [Validators.required]],
      startDate: [this.work?.startDate || null],
      endDate: [this.work?.endDate || null],
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

    if (this.work?.id) {
      this.workService.updateWork(this.work.id, formSubmit).subscribe((res) => {
        if (res.success) {
          this.onClose$.next(res.success);
          this.bsModalRef?.hide();
        }
      });
    } else {
      this.workService.createWork(formSubmit).subscribe((work) => {
        if (work) {
          this.onClose$.next(work);
          this.bsModalRef?.hide();
        }
      });
    }
  }

  controls(name: string) {
    return this.form.controls[name];
  }
}
