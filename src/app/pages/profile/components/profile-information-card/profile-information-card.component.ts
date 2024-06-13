import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { CommonService } from 'src/app/modules/partials/_services/common.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-profile-information-card',
  templateUrl: './profile-information-card.component.html',
  styleUrls: ['./profile-information-card.component.scss'],
})
export class ProfileInformationCardComponent implements OnInit {
  @Input() user: UserModel;
  isUserLoggedProfile: boolean = false;
  // userLogger$: Observable<UserModel>;
  imgFile: File;
  imgPreviewSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  imgPreview$: Observable<string> = this.imgPreviewSubject.asObservable();

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    if (!this.user?.id) {
      this.authService.currentUser$.subscribe((user) => {
        this.user = user;
      });
      this.isUserLoggedProfile = true;
    }

    this.imgPreviewSubject.next(this.user.avatar);
  }

  readURL(event: Event | any) {
    if (event.target.files && event.target.files[0]) {
      this.imgFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => this.imgPreviewSubject.next(reader.result as string);
      reader.readAsDataURL(this.imgFile);
    }
    // Update avatar
    if (this.imgFile) {
      this.commonService.upLoadFiles([this.imgFile]).subscribe((filePaths) => {
        const dataSubmit = {
          avatar: filePaths[0].path,
        };
        this.userService.updateUser(dataSubmit).subscribe((res) => {
          if (res) {
            this.authService.currentUserSubject.next(res);
          }
        });
      });
    }
  }
}
