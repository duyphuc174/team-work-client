import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemberModel } from '../_models/workspace.model';

const API_BASE_URL = `${environment.apiUrl}`;
const API_MEMBER_URL = `${API_BASE_URL}/members`;

@Injectable({
  providedIn: 'root',
})
export class MemberHttpService {
  constructor(private http: HttpClient) {}

  getMembers(workspaceId: number, params?: any): Observable<any> {
    return this.http.get<any>(`${API_MEMBER_URL}/${workspaceId}`, { params });
  }
}

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
}
