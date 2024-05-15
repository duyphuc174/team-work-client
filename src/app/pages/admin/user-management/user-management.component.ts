import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { UserService } from 'src/app/modules/auth/_services/user.service';
import { UserManagementCreateComponent } from './user-management-create/user-management-create.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.usersSubject.asObservable();

  constructor(private usersService: UserService, private bsModalService: BsModalService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoadingSubject.next(true);
    this.usersService.getUsers().subscribe((users) => {
      if (users) {
        this.usersSubject.next(users);
      }
      this.isLoadingSubject.next(false);
    });
  }

  openModalCreateUser() {
    const bsModalRef = this.bsModalService.show(UserManagementCreateComponent);
    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }
}
