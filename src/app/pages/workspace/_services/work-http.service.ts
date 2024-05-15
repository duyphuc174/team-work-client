import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_WORK_URL = `${API_BASE_URL}/works`;

@Injectable({
  providedIn: 'root',
})
export class WorkHttpService {
  constructor(private http: HttpClient) {}

  getWorks(sprintId: number, params?: any): Observable<any> {
    return this.http.get<any>(`${API_WORK_URL}/sprint/${sprintId}`, { params });
  }

  createWork(data: any): Observable<any> {
    return this.http.post<any>(API_WORK_URL, data);
  }

  getWorkById(id: number): Observable<any> {
    return this.http.get<any>(`${API_WORK_URL}/${id}`);
  }

  updateWork(id: number, data: any): Observable<any> {
    return this.http.post<any>(`${API_WORK_URL}/${id}`, data);
  }

  deleteWork(id: number): Observable<any> {
    return this.http.delete<any>(`${API_WORK_URL}/${id}`);
  }

  addFilesToWork(id: number, data: any): Observable<any> {
    return this.http.post<any>(`${API_WORK_URL}/${id}/files`, data);
  }
}
