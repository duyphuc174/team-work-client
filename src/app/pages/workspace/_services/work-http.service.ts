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

  getWorks(sprintId: number): Observable<any> {
    return this.http.get<any>(`${API_WORK_URL}/${sprintId}`);
  }

  createWork(data: any): Observable<any> {
    return this.http.post<any>(API_WORK_URL, data);
  }
}
