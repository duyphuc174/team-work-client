import { Component, HostBinding, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { UserRegister } from '../../_models/user.model';

class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(control: AbstractControl): void {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('cPassword')?.value;

    if (password !== confirmPassword) {
      control.get('cPassword')?.setErrors({ ConfirmPassword: true });
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @HostBinding('class') class = 'd-content';
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.email])],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
        cPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      },
    );
  }

  register() {
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;
    const dataSubmit: UserRegister = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
    };

    this.authService.register(dataSubmit).subscribe((res) => {
      if (res) {
        this.router.navigate(['/']);
      }
    });
  }

  control(name: string) {
    return this.form.controls[name];
  }

  controlErrors(name: string) {
    return this.control(name).errors;
  }
}
