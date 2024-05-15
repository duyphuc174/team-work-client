import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { ChangePasswordComponent } from 'src/app/modules/auth/components/change-password/change-password.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  userLogged: UserModel;

  constructor(private authService: AuthService, private router: Router, private bsModalService: BsModalService) {
    this.userLogged = this.authService.currentUserValue;
    console.log(this.userLogged);
  }

  goToProfile() {
    this.router.navigate(['/profile/me']);
  }

  goToManageUser() {
    this.router.navigate(['/admin/users']);
  }

  openMopdalChangePassword() {
    this.bsModalService.show(ChangePasswordComponent);
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
