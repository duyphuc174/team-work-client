import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_TASK_URL = `${API_BASE_URL}/tasks`;

@Injectable({
  providedIn: 'root',
})
export class TaskHttpService {
  constructor(private http: HttpClient) {}

  getTasks(params?: any): Observable<any> {
    return this.http.get<any>(`${API_TASK_URL}`, { params });
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${API_TASK_URL}/${id}`);
  }

  createTask(data: any): Observable<any> {
    return this.http.post<any>(API_TASK_URL, data);
  }

  updateTask(id: number, data: any): Observable<any> {
    return this.http.post<any>(`${API_TASK_URL}/${id}`, data);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${API_TASK_URL}/${id}`);
  }

  addFilesToTask(id: number, data: any): Observable<any> {
    return this.http.post<any>(`${API_TASK_URL}/${id}/files`, data);
  }

  deleteFile(id: number, fileId: number): Observable<any> {
    return this.http.delete<any>(`${API_TASK_URL}/${id}/files/${fileId}`);
  }
}
