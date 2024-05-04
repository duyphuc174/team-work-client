import { Component, OnInit } from '@angular/core';
import { initDropdowns } from 'flowbite';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';

@Component({
  selector: 'app-profile-information-card',
  templateUrl: './profile-information-card.component.html',
  styleUrls: ['./profile-information-card.component.scss'],
})
export class ProfileInformationCardComponent implements OnInit {
  userLogger$: Observable<UserModel>;

  constructor(private authService: AuthService) {
    this.userLogger$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    initDropdowns();
  }
}
