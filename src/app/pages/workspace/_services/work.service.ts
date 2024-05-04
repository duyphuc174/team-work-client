import { Injectable } from '@angular/core';
import { WorkHttpService } from './work-http.service';
import { Observable, catchError, map, of } from 'rxjs';
import { WorkModel } from '../_models/workspace.model';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  constructor(private workHttpService: WorkHttpService) {}

  getWorks(sprintId: number): Observable<WorkModel[]> {
    return this.workHttpService.getWorks(sprintId).pipe(
      map((res: any) => {
        return res.map((work: any) => {
          const w = new WorkModel();
          w.setData(work);
          return w;
        });
      }),
      catchError((err) => {
        console.log(err);
        return of(err);
      }),
    );
  }

  createWork(data: any): Observable<WorkModel> {
    return this.workHttpService.createWork(data).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }
}
