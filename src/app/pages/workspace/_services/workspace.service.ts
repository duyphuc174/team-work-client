import { Injectable } from '@angular/core';
import { WorkspaceHtppService } from './workspace-htpp.service';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { WorkspaceModel } from '../_models/workspace.model';
import { UserModel } from 'src/app/modules/auth/_models/user.model';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  currentWorksapceSubject: BehaviorSubject<WorkspaceModel> = new BehaviorSubject<WorkspaceModel>(null);
  currentWorkspace$: Observable<WorkspaceModel> = this.currentWorksapceSubject.asObservable();

  constructor(private workspaceHttpService: WorkspaceHtppService) {}

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
        return w;
      }),
      catchError((err) => {
        console.log(err);
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
}
