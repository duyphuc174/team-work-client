import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { SprintModel } from '../_models/sprint.model';
import { SprintHttpService } from './sprint-http.service';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  constructor(private sprintHttpService: SprintHttpService) {}

  createSprint(data: any): Observable<SprintModel> {
    return this.sprintHttpService.createSprint(data).pipe(
      map((res) => {
        const s = new SprintModel();
        s.setData(res);
        return s;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  updateSprint(id, data): Observable<any> {
    return this.sprintHttpService.updateSprint(id, data).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  deleteSprint(id: number): Observable<any> {
    return this.sprintHttpService.deleteSprint(id).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return of(undefined);
      }),
    );
  }
}
