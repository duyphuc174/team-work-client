import { Injectable } from '@angular/core';
import { UserHttpService } from './user-http.service';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { WorkspaceModel } from '../../workspace/_models/workspace.model';
import { HandleHttpMessageServiceService } from 'src/app/modules/partials/_services/handle-http-message-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userHttpService: UserHttpService, private handleMessage: HandleHttpMessageServiceService) {}

  updateUser(data: any): Observable<UserModel> {
    return this.userHttpService.updateUser(data).pipe(
      map((res) => {
        const u = new UserModel();
        u.setData(res);
        return u;
      }),
      tap(() => {
        this.handleMessage.showSuccess('Cập nhật thông tin thành công!');
      }),
      catchError((err) => of(undefined)),
    );
  }

  getUserInformationById(userId: number): Observable<any> {
    return this.userHttpService.getUserInformationById(userId).pipe(
      map((res) => {
        const u = new UserModel();
        u.setData(res.user);
        const commonWorkspaces = res.commonWorkspaces.map((workspace) => {
          const w = new WorkspaceModel();
          w.setData(workspace);
          return w;
        });
        return { user: u, commonWorkspaces };
      }),
      catchError((err) => of(undefined)),
    );
  }

  getNotifications(params?: any): Observable<any> {
    return this.userHttpService.getNotifications(params).pipe(
      map((res) => {
        console.log(res);

        return res;
      }),
      catchError((err) => of(undefined)),
    );
  }
}
