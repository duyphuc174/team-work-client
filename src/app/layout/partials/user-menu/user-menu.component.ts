import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
