import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }
    this.authService.logout();
    return false;
  }

  canActivateChild() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser.role.name === 'admin') {
      return true;
    }
    this.authService.logout();
    return false;
  }
}
