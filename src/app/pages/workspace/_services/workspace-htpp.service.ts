import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_WORKSPACE_URL = `${API_BASE_URL}/workspaces`;

@Injectable({
  providedIn: 'root',
})
export class WorkspaceHtppService {
  constructor(private http: HttpClient) {}

  getWorkspaces(): Observable<any> {
    return this.http.get<any>(API_WORKSPACE_URL);
  }

  createWorkspace(data: any): Observable<any> {
    return this.http.post<any>(API_WORKSPACE_URL, data);
  }

  getWorkspace(id: number): Observable<any> {
    return this.http.get<any>(`${API_WORKSPACE_URL}/${id}`);
  }

  getUsers(id: number, params?: any): Observable<any> {
    return this.http.get<any>(`${API_WORKSPACE_URL}/${id}/users`, { params });
  }

  addMemberToWorkspace(id: number, userIds: number[]): Observable<any> {
    return this.http.post<any>(`${API_WORKSPACE_URL}/${id}/members`, { userIds });
  }
}
