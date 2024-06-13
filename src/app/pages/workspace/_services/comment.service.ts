import { Injectable } from '@angular/core';
import { CommentHttpService } from './comment-http.service';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { CommentModel } from '../_models/comment.model';
import { HandleHttpMessageServiceService } from 'src/app/modules/partials/_services/handle-http-message-service.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private commentHttpService: CommentHttpService, private handleMessage: HandleHttpMessageServiceService) {}

  createComment(taskId: number, content: string): Observable<any> {
    return this.commentHttpService.createComment({ taskId, content }).pipe(
      map((res: any) => {
        return res;
      }),
      tap(() => {
        this.handleMessage.showSuccess('Thêm bình luận thành công!');
      }),
      catchError((err) => {
        return of(err);
      }),
    );
  }

  getCommentsByTaskId(id: number): Observable<CommentModel[]> {
    return this.commentHttpService.getCommentsByTaskId(id).pipe(
      map((res: any) => {
        return res.map((comment) => {
          const c = new CommentModel();
          c.setData(comment);
          return c;
        });
      }),
      catchError((err) => {
        return of(err);
      }),
    );
  }

  deleteComment(id: number): Observable<any> {
    return this.commentHttpService.deleteComment(id).pipe(
      map((res) => {
        return res;
      }),
      tap(() => {
        this.handleMessage.showSuccess('Xóa bình luận thành công!');
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      }),
    );
  }
}
