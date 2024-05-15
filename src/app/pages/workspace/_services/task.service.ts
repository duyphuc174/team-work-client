import { Injectable } from '@angular/core';
import { TaskHttpService } from './task-http.service';
import { Observable, catchError, map, of } from 'rxjs';
import { TaskModel } from '../_models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private taskHttpService: TaskHttpService) {}

  getTasks(params?: any): Observable<TaskModel[]> {
    return this.taskHttpService.getTasks(params).pipe(
      map((res) => {
        return res.map((task) => {
          const t = new TaskModel();
          t.setData(task);
          return t;
        });
      }),
      catchError((err) => {
        return of([]);
      }),
    );
  }

  createTask(data: any): Observable<TaskModel> {
    return this.taskHttpService.createTask(data).pipe(
      map((res) => {
        const t = new TaskModel();
        t.setData(res);
        return t;
      }),
      catchError((err) => {
        return of(err);
      }),
    );
  }

  updateTask(id: number, data: any): Observable<any> {
    return this.taskHttpService.updateTask(id, data).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return of(err);
      }),
    );
  }
}
