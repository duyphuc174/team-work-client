import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel, getUserRoleName, tranformUserBagdeClass } from 'src/app/modules/auth/_models/user.model';
import { UserService } from 'src/app/modules/auth/_services/user.service';

@Component({
  selector: 'app-user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrls: ['./user-management-list.component.scss'],
})
export class UserManagementListComponent implements OnInit {
  @Input() users: UserModel[] = [];

  transformRoleBagdeClass = tranformUserBagdeClass;
  getUserRoleName = getUserRoleName;

  ngOnInit(): void {}
}
