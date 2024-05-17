import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { UserService } from 'src/app/modules/auth/_services/user.service';
import { WorkspaceService } from '../../../_services/workspace.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-workspace-member-add',
  templateUrl: './workspace-member-add.component.html',
  styleUrls: ['./workspace-member-add.component.scss'],
})
export class WorkspaceMemberAddComponent {
  usersAddSubject: BehaviorSubject<{ info: UserModel; selected: boolean }[]> = new BehaviorSubject<
    { info: UserModel; selected: boolean }[]
  >([]);
  usersAdd$: Observable<{ info: UserModel; selected: boolean }[]> = this.usersAddSubject.asObservable();

  usersSelected: UserModel[] = [];

  inputValue: any;
  onClose$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userService: UserService,
    private workspaceService: WorkspaceService,
    public bsModalRef: BsModalRef,
  ) {}

  searchUsers(input: any) {
    const term = input.target.value;
    if (term) {
      const params = {
        find: term,
      };
      this.workspaceService.getUsers(params).subscribe((users) => {
        const usersAdd = users.map((user) => {
          return this.usersSelected.find((u) => u.id === user.id)
            ? { info: user, selected: true }
            : { info: user, selected: false };
        });
        this.usersAddSubject.next(usersAdd);
      });
    }
  }

  selectUser(user: UserModel, index: number) {
    this.usersSelected.push(user);
    this.usersAddSubject.value[index].selected = true;
  }

  removeUserSelected(user: UserModel, index: number) {
    this.usersSelected.splice(index, 1);
    let list = this.usersAddSubject.value;
    list = list.map((u) => {
      if (u.info.id === user.id) {
        u.selected = false;
      }
      return u;
    });

    this.usersAddSubject.next(list);
  }

  addUserToWorkspace() {
    const userIds = this.usersSelected.map((u) => u.id);
    this.workspaceService.addWorkspaceMember(userIds).subscribe((res) => {
      if (res) {
        this.onClose$.next(res);
        this.bsModalRef.hide();
      }
    });
  }

  onInputChange(event: any) {
    console.log(event.target.value);
  }
}
