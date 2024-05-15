import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @HostBinding('class') class = 'd-content';

  form: FormGroup;
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.isLoading$ = this.isLoading$;
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
    });
  }

  submit() {
    const user = this.form.value;
    this.authService.login(user.email, user.password).subscribe((res) => {
      if (res) {
        this.router.navigate(['/']);
      }
    });
  }

  control(name: string) {
    return this.form.controls[name];
  }
}
