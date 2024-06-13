import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/modules/auth/_models/user.model';

@Component({
  selector: 'app-user-avatar-infor',
  templateUrl: './user-avatar-infor.component.html',
  styleUrls: ['./user-avatar-infor.component.scss'],
})
export class UserAvatarInforComponent implements OnInit {
  @Input() user: UserModel;
  @Input() showName: boolean = true;
  @Input() size: number = 8;
  @Input() showEmail: boolean = true;
  @Input() textSize: string = '1rem';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToProfile() {
    this.router.navigate(['/profile', this.user.id]);
  }
}
