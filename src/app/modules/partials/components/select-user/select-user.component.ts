import { Component, Input } from '@angular/core';
import { UserModel } from 'src/app/modules/auth/_models/user.model';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
})
export class SelectUserComponent {
  @Input() users: UserModel[] = [];
}
