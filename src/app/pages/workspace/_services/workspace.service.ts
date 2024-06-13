import { Injectable } from '@angular/core';
import { WorkspaceHtppService } from './workspace-htpp.service';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { MemberRoleEnum, WorkspaceModel } from '../_models/workspace.model';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { SprintModel } from '../_models/sprint.model';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { TaskModel } from '../_models/task.model';
import { NotificationModel } from '../../notification/_models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  currentWorksapceSubject: BehaviorSubject<WorkspaceModel> = new BehaviorSubject<WorkspaceModel>(null);
  currentWorkspace$: Observable<WorkspaceModel> = this.currentWorksapceSubject.asObservable();

  unReadNotiCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  unReadNotiCount$: Observable<number> = this.unReadNotiCountSubject.asObservable();

  userLogged: UserModel;
  userLoggedRole: MemberRoleEnum;

  constructor(private workspaceHttpService: WorkspaceHtppService, private authService: AuthService) {
    this.userLogged = this.authService.currentUserValue;
  }

  getWorkspaces(): Observable<any> {
    return this.workspaceHttpService.getWorkspaces().pipe(
      map((res: any) => {
        const worksapces = res.map((workspace) => {
          const w = new WorkspaceModel();
          w.setData(workspace);
          return w;
        });
        return worksapces;
      }),
      catchError((err) => {
        console.log(err);

        return of([]);
      }),
    );
  }

  createWorkspace(data: any): Observable<any> {
    return this.workspaceHttpService.createWorkspace(data).pipe(
      map((res: any) => {
        const w = new WorkspaceModel();
        w.setData(res);
        return w;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  getWorkspaceById(id: number): Observable<any> {
    return this.workspaceHttpService.getWorkspace(id).pipe(
      map((res: any) => {
        const w = new WorkspaceModel();
        w.setData(res);
        this.currentWorksapceSubject.next(w);
        const m = w.members.find((m) => m.user.id === this.userLogged.id);
        if (m) {
          this.userLoggedRole = m.role;
        }
        return w;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  updateWorkspace(id: number, data: any): Observable<any> {
    return this.workspaceHttpService.updateWorkspace(id, data).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  deleteWorkspace(id: number): Observable<any> {
    return this.workspaceHttpService.deleteWorkspace(id).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return of(undefined);
      }),
    );
  }

  getUsers(params?: any): Observable<any> {
    const workspaceId = this.currentWorksapceSubject.value.id;
    return this.workspaceHttpService.getUsers(workspaceId, params).pipe(
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

  addWorkspaceMember(usersId: number[]): Observable<any> {
    const workspaceId = this.currentWorksapceSubject.value.id;
    return this.workspaceHttpService.addMemberToWorkspace(workspaceId, usersId).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  createSprint(data: any): Observable<any> {
    const workspaceId = this.currentWorksapceSubject.value.id;
    return this.workspaceHttpService.createSprint(workspaceId, data).pipe(
      map((res: any) => {
        const sprint = new SprintModel();
        sprint.setData(res);
        return sprint;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  getSprints(params?: any): Observable<any> {
    const workspaceId = this.currentWorksapceSubject.value.id;
    return this.workspaceHttpService.getSprints(workspaceId, params).pipe(
      map((sprints) => {
        return sprints.map((sprint) => {
          const s = new SprintModel();
          s.setData(sprint);
          return s;
        });
      }),
      catchError((err) => {
        return of([]);
      }),
    );
  }

  getTasks(params?: any): Observable<any> {
    const workspaceId = this.currentWorksapceSubject.value.id;
    return this.workspaceHttpService.getTasks(workspaceId, params).pipe(
      map((res) => {
        return res.map((task) => {
          const t = new TaskModel();
          t.setData(task);
          return { task: t, work: task.work };
        });
      }),
      catchError((err) => {
        return of([]);
      }),
    );
  }

  getNotifications(params?: any): Observable<any> {
    const workspaceId = this.currentWorksapceSubject.value.id;
    return this.workspaceHttpService.getNotifications(workspaceId, params).pipe(
      map((res) => {
        const notifications = res.notifications.map((notification) => {
          const noti = new NotificationModel();
          noti.setData(notification);
          return noti;
        });
        this.unReadNotiCountSubject.next(res.notiUnreadCount);
        return { notifications, readCount: res.notiReadCount, unReadCount: res.notiUnreadCount };
      }),
      catchError((err) => {
        return of(undefined);
      }),
    );
  }
}
