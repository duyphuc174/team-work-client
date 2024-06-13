import { Injectable } from '@angular/core';
import { TaskHttpService } from './task-http.service';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { TaskModel } from '../_models/task.model';
import { HandleHttpMessageServiceService } from 'src/app/modules/partials/_services/handle-http-message-service.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private taskHttpService: TaskHttpService, private handleMessage: HandleHttpMessageServiceService) {}

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

  getTaskById(id: number): Observable<TaskModel> {
    return this.taskHttpService.getTaskById(id).pipe(
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

  createTask(data: any): Observable<TaskModel> {
    return this.taskHttpService.createTask(data).pipe(
      map((res) => {
        const t = new TaskModel();
        t.setData(res);
        return t;
      }),
      tap(() => {
        this.handleMessage.showSuccess('Tạo mới thành công!');
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
      tap(() => {
        this.handleMessage.showSuccess('Cập nhật thành công!');
      }),
      catchError((err) => {
        return of(err);
      }),
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.taskHttpService.deleteTask(id).pipe(
      map((res) => {
        return res;
      }),
      tap(() => {
        this.handleMessage.showSuccess('Xóa thành công!');
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  addFilesToTask(id: number, data: any): Observable<any> {
    return this.taskHttpService.addFilesToTask(id, data).pipe(
      map((res) => {
        return res;
      }),
      tap(() => {
        this.handleMessage.showSuccess('Thêm file thành công!');
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }

  deleteFile(id: number, fileId: number): Observable<any> {
    return this.taskHttpService.deleteFile(id, fileId).pipe(
      map((res) => {
        return res;
      }),
      tap(() => {
        this.handleMessage.showSuccess('Xóa file thành công!');
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }
}
