import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../partials/partials.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ChangePasswordComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, RouterLink, HttpClientModule, PartialsModule],
})
export class AuthModule {}
