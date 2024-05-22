import { Injectable } from '@angular/core';
import { WorkHttpService } from './work-http.service';
import { Observable, catchError, map, of } from 'rxjs';
import { WorkModel } from '../_models/work.model';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  constructor(private workHttpService: WorkHttpService) {}

  getWorks(sprintId: number, params?: any): Observable<WorkModel[]> {
    return this.workHttpService.getWorks(sprintId, params).pipe(
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

  getWorkById(id: number): Observable<WorkModel> {
    return this.workHttpService.getWorkById(id).pipe(
      map((res: any) => {
        const w = new WorkModel();
        w.setData(res);
        return w;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  updateWork(id: number, data: any): Observable<any> {
    return this.workHttpService.updateWork(id, data).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  deleteWork(id: number): Observable<any> {
    return this.workHttpService.deleteWork(id).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  addFilesToWork(id: number, data: any): Observable<any> {
    return this.workHttpService.addFilesToWork(id, data).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  deleteFile(id: number, fileId: number): Observable<any> {
    return this.workHttpService.deleteFile(id, fileId).pipe(
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
