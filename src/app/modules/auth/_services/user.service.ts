import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserModel } from '../_models/user.model';
import { UserHttpService } from './user-http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userHttpService: UserHttpService) {}

  getUsers(params?: any): Observable<UserModel[]> {
    return this.userHttpService.getUsers(params).pipe(
      map((users) => {
        return users.map((user) => {
          const u = new UserModel();
          u.setData(user);
          return u;
        });
      }),
      catchError((err) => {
        return of([]);
      }),
    );
  }

  createUser(data: any): Observable<any> {
    return this.userHttpService.createUser(data).pipe(
      map((res) => {
        const u = new UserModel();
        u.setData(res);
        return u;
      }),
      catchError((err) => of(undefined)),
    );
  }

  searchUsers(params?: any): Observable<UserModel[]> {
    return this.userHttpService.searchUsers(params).pipe(
      map((users) => {
        return users.map((user) => {
          const u = new UserModel();
          u.setData(user);
          return u;
        });
      }),
      catchError((err) => {
        return of([]);
      }),
    );
  }

  updateInformation(data: any): Observable<any> {
    return this.userHttpService.updateInformation(data).pipe(
      map((res) => res),
      catchError((err) => of(undefined)),
    );
  }
}
