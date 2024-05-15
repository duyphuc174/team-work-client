import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  updateRole(memberId: number, role: string): Observable<any> {
    return this.http.post<any>(`${API_MEMBER_URL}/${memberId}`, { role });
  }

  deleteMembers(data): Observable<any> {
    return this.http.post<any>(`${API_MEMBER_URL}/delete/muiltiple`, data);
  }
}
