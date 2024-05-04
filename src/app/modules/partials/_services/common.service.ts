import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { ImportantModel } from 'src/app/pages/workspace/_models/workspace.model';
import { environment } from 'src/environments/environment';

const API_BASE_URL = `${environment.apiUrl}`;
const API_UPLOAD_URL = `${API_BASE_URL}/uploads`;
const API_IMPORTANT_URL = `${API_BASE_URL}/importants`;

@Injectable({
  providedIn: 'root',
})
class CommonHttpService {
  constructor(private http: HttpClient) {}

  upLoadFiles(formData: FormData): Observable<any> {
    return this.http.post<any>(API_UPLOAD_URL, formData);
  }

  getImportants(): Observable<any> {
    return this.http.get<any>(API_IMPORTANT_URL);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  importantsSubject: BehaviorSubject<ImportantModel[]> = new BehaviorSubject<ImportantModel[]>([]);
  importants$: Observable<ImportantModel[]> = this.importantsSubject.asObservable();

  constructor(private commonHttpService: CommonHttpService) {}

  upLoadFiles(formData: FormData): Observable<any> {
    return this.commonHttpService.upLoadFiles(formData).pipe(
      map((res) => res),
      catchError((err) => of(undefined)),
    );
  }

  getImportants(): Observable<any> {
    return this.commonHttpService.getImportants().pipe(
      map((res) => {
        const importants = res.map((important) => {
          const i = new ImportantModel();
          i.setData(important);
          return i;
        });
        this.importantsSubject.next(importants);
        return importants;
      }),
      catchError((err) => of([])),
    );
  }
}
