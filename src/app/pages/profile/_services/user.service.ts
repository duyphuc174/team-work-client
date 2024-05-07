import { Injectable } from '@angular/core';
import { UserHttpService } from './user-http.service';
import { Observable, catchError, map, of } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userHttpService: UserHttpService) { }

  updateUser(data: any): Observable<UserModel> {
    return this.userHttpService.updateUser(data).pipe(
      map(res => {
        const u = new UserModel();
        u.setData(res);
        return u;
      }),
      catchError(err => of(undefined))
    );
  }
}
