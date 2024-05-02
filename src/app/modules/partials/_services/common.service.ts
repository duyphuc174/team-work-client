import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_UPLOAD_URL = `${API_BASE_URL}/uploads`;

@Injectable({
  providedIn: 'root',
})
class CommonHttpService {
  constructor(private http: HttpClient) {}

  upLoadFiles(formData: FormData): Observable<any> {
    return this.http.post<any>(API_UPLOAD_URL, formData);
  }
}

export class CommonService {
  constructor(private commonHttpService: CommonHttpService) {}

  upLoadFiles(formData: FormData): Observable<any> {
    return this.commonHttpService.upLoadFiles(formData).pipe(
      map((res) => res),
      catchError((err) => of(undefined)),
    );
  }
}
