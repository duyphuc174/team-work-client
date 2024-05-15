import { Injectable } from '@angular/core';
import { CommentHttpService } from './comment-http.service';
import { Observable, catchError, map, of } from 'rxjs';
import { CommentModel } from '../_models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private commentHttpService: CommentHttpService) {}

  createComment(taskId: number, content: string): Observable<any> {
    return this.commentHttpService.createComment({ taskId, content }).pipe(
      map((res: any) => {
        return res;
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
}
