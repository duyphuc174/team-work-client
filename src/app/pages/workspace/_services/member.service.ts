import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { MemberModel } from '../_models/workspace.model';
import { MemberHttpService } from './member-http.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private memberHttpService: MemberHttpService) {}

  getMembersByWorkspaceId(workspaceId: number, params?: any): Observable<MemberModel[]> {
    return this.memberHttpService.getMembers(workspaceId, params).pipe(
      map((res) => {
        return res.map((member) => {
          const m = new MemberModel();
          m.setData(member);
          return m;
        });
      }),
      catchError((err) => {
        console.log(err);
        return of([]);
      }),
    );
  }

  updateRole(memberId: number, role: string): Observable<any> {
    return this.memberHttpService.updateRole(memberId, role).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  deleteMembers(workspaceId: number, memberIds: number[]): Observable<any> {
    return this.memberHttpService.deleteMembers({ workspaceId, memberIds }).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }
}
