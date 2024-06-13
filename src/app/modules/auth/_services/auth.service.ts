import { Injectable, OnDestroy } from '@angular/core';
import { AuthHttpService } from './auth-http.service';
import { BehaviorSubject, Observable, Subscription, catchError, finalize, map, of, switchMap, tap } from 'rxjs';
import { AuthModel } from '../_models/auth.model';
import { environment } from 'src/environments/environment';
import { UserModel, UserRegister } from '../_models/user.model';
import { Router } from '@angular/router';
import { HandleHttpMessageServiceService } from '../../partials/_services/handle-http-message-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private unsubcribe: Subscription[] = [];
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  currentUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);
  currentUser$: Observable<UserModel> = this.currentUserSubject.asObservable();

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  constructor(
    private authHttpService: AuthHttpService,
    private router: Router,
    private handleMessage: HandleHttpMessageServiceService,
  ) {
    const subcr = this.getUserByToken().subscribe();
    this.unsubcribe.push(subcr);
  }

  register(userRegister: UserRegister): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.register(userRegister).pipe(
      map((res: any) => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(userRegister.email, userRegister.password)),
      catchError((err) => {
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  login(email: string, password: string): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((res: any) => {
        const auth = new AuthModel();
        auth.setAuth(res);
        return this.setAuthFromLocalStorage(auth);
      }),
      switchMap(() => this.getUserByToken()),
      tap(() => {
        this.isLoadingSubject.next(false);
        this.handleMessage.showSuccess('Đăng nhập thành công!');
      }),
      catchError((err) => {
        return of(undefined);
      }),
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  changePassword(data: any): Observable<any> {
    return this.authHttpService.changePassword(data).pipe(
      map((res: any) => {
        this.handleMessage.showSuccess('Đổi mật khẩu thành công!');
        return res;
      }),
      catchError((err) => {
        return of(undefined);
      }),
    );
  }

  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      map((user) => {
        if (user) {
          const u = new UserModel();
          u.setData(user);
          this.currentUserSubject.next(u);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }
      return JSON.parse(lsValue);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy(): void {
    this.unsubcribe.forEach((sb) => sb.unsubscribe());
  }
}
