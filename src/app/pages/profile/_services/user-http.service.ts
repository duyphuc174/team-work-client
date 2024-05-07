import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_USER_URL = `${API_BASE_URL}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http: HttpClient) { }

  updateUser(data: any): Observable<UserModel> {
    return this.http.post<any>(`${API_USER_URL}/information`, data);
  }
}
