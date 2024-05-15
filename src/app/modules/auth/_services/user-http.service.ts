import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_USER_URL = `${API_BASE_URL}/users`;

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  constructor(private http: HttpClient) {}

  getUsers(params?: any): Observable<any> {
    return this.http.get<any>(API_USER_URL, { params });
  }

  createUser(data: any): Observable<any> {
    return this.http.post<any>(API_USER_URL, data);
  }

  searchUsers(params?: any): Observable<any> {
    return this.http.get<any>(`${API_USER_URL}/search`, { params });
  }

  updateInformation(data: any): Observable<any> {
    return this.http.put<any>(`${API_USER_URL}/information`, data);
  }
}
