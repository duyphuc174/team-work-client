import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../_models/user.model';

const API_BASE_URL = `${environment.apiUrl}`;
const API_AUTH_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${API_AUTH_URL}/login`, { email, password });
  }

  register(userRegister: UserRegister): Observable<any> {
    return this.http.post(`${API_AUTH_URL}/register`, userRegister);
  }

  getUserByToken(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${API_AUTH_URL}/token`, { headers: httpHeaders });
  }
}
