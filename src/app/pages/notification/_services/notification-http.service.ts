import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_NOTIFICATION_URL = `${API_BASE_URL}/notifications`;

@Injectable({
  providedIn: 'root',
})
export class NotificationHttpService {
  constructor(private http: HttpClient) {}

  getNotifications(params?: any): Observable<any> {
    return this.http.get<any>(API_NOTIFICATION_URL, { params });
  }

  markReadNotification(id: number): Observable<any> {
    return this.http.post<any>(`${API_NOTIFICATION_URL}/${id}/mark-read`, {});
  }
}
