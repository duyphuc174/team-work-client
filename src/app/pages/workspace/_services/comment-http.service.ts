import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_COMMENT_URL = `${API_BASE_URL}/comments`;

@Injectable({
  providedIn: 'root',
})
export class CommentHttpService {
  constructor(private http: HttpClient) {}

  createComment(data: any): Observable<any> {
    return this.http.post<any>(API_COMMENT_URL, data);
  }

  getCommentsByTaskId(id: number): Observable<any> {
    return this.http.get<any>(`${API_COMMENT_URL}/task/${id}`);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${API_COMMENT_URL}/${id}`);
  }
}
