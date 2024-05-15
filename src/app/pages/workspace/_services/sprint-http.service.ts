import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_SPRINT_URL = `${API_BASE_URL}/sprints`;

@Injectable({
  providedIn: 'root',
})
export class SprintHttpService {
  constructor(private http: HttpClient) {}

  getSprints(workspaceId: number): Observable<any> {
    return this.http.get<any>(`${API_SPRINT_URL}/${workspaceId}`);
  }

  createSprint(data: any): Observable<any> {
    return this.http.post<any>(API_SPRINT_URL, data);
  }

  updateSprint(id: number, data: any): Observable<any> {
    return this.http.post<any>(`${API_SPRINT_URL}/${id}`, data);
  }

  deleteSprint(id: number): Observable<any> {
    return this.http.delete<any>(`${API_SPRINT_URL}/${id}`);
  }
}
