import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserService } from 'src/app/modules/auth/_services/user.service';

@Component({
  selector: 'app-user-management-create',
  templateUrl: './user-management-create.component.html',
  styleUrls: ['./user-management-create.component.scss'],
})
export class UserManagementCreateComponent implements OnInit {
  form: FormGroup;

  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  onClose$: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder, private userService: UserService, private bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
    });
  }

  createUser() {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;
    const dataCreate = {
      email: formValue.email,
      password: formValue.password,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
    };
    this.isLoadingSubject.next(true);
    this.userService.createUser(dataCreate).subscribe((user) => {
      if (user) {
        this.onClose$.next(user);
        this.form.reset();
        this.bsModalRef.hide();
      }
      this.isLoadingSubject.next(false);
    });
  }

  control(name: string) {
    return this.form.controls[name];
  }
}
