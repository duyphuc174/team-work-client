import { Component, Input, OnInit } from '@angular/core';
import { initTooltips } from 'flowbite';
import { UserModel } from 'src/app/modules/auth/_models/user.model';

@Component({
  selector: 'app-user-avatar-infor',
  templateUrl: './user-avatar-infor.component.html',
  styleUrls: ['./user-avatar-infor.component.scss'],
})
export class UserAvatarInforComponent implements OnInit {
  @Input() user: UserModel;
  @Input() showName: boolean = true;

  ngOnInit(): void {
    initTooltips();
  }
}
