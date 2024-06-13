import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { WorkspaceModel } from 'src/app/pages/workspace/_models/workspace.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-profile-user-activity',
  templateUrl: './profile-user-activity.component.html',
  styleUrls: ['./profile-user-activity.component.scss'],
})
export class ProfileUserActivityComponent implements OnInit {
  @Input() user: UserModel;
  @Input() workspace: WorkspaceModel;
  userLogged: UserModel;
  params: any = {};

  constructor(private authService: AuthService, private userService: UserService) {
    this.userLogged = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.params = {
      userId: this.user.id,
      workspaceId: this.workspace?.id,
    };
    this.userService.getNotifications(this.params).subscribe((res) => {
      console.log(res);
    });
  }
}
