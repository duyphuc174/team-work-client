import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { UserService } from '../../_services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-information-update',
  templateUrl: './profile-information-update.component.html',
  styleUrls: ['./profile-information-update.component.scss'],
})
export class ProfileInformationUpdateComponent implements OnInit {
  userLogged: UserModel;
  form: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private userService: UserService) {
    this.userLogged = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      firstName: [this.userLogged.firstName, [Validators.required]],
      lastName: [this.userLogged.lastName, [Validators.required]],
      birthday: [moment(this.userLogged.birthday, 'DD/MM/YYYY').toDate()],
      phone: [this.userLogged.phone || ''],
      address: [this.userLogged.address || ''],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const formSubmit = this.form.value;

    this.userService.updateUser(formSubmit).subscribe((res) => {
      if (res) {
        this.authService.currentUserSubject.next(res);
      }
    });
  }
}
