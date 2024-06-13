import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { UserService } from '../../_services/user.service';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { WorkspaceModel } from 'src/app/pages/workspace/_models/workspace.model';
import { WorkspaceService } from 'src/app/pages/workspace/_services/workspace.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile-view-user',
  templateUrl: './profile-view-user.component.html',
  styleUrls: ['./profile-view-user.component.scss'],
})
export class ProfileViewUserComponent {
  user: UserModel;
  workspaces: WorkspaceModel[] = [];
  currentWorkspaceSubject = new BehaviorSubject<WorkspaceModel>(null);
  currentWorkspace$ = this.currentWorkspaceSubject.asObservable();
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private workspaceService: WorkspaceService,
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (+params?.id) {
        if (+params?.id === this.authService.currentUserValue.id) {
          this.router.navigate(['/profile/me']);
        } else {
          this.userService.getUserInformationById(+params?.id).subscribe((res) => {
            if (res) {
              this.user = res.user;
              this.workspaces = res.commonWorkspaces;
            }
          });
        }
      }
    });
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params?.workspaceId) {
        if (!this.workspaceService.currentWorksapceSubject.value?.id) {
          this.workspaceService.getWorkspaceById(+params?.workspaceId).subscribe((res) => {
            if (res) {
              this.workspaceService.currentWorksapceSubject.next(res);
              this.currentWorkspaceSubject.next(res);
            }
          });
        }
      }
    });
  }
}
