import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
    });
  }

  changePassword() {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;
    this.authService.changePassword(formData).subscribe((res) => {
      if (res.success) {
        this.bsModalRef.hide();
      } else {
        this.form.reset();
      }
    });
  }
}
