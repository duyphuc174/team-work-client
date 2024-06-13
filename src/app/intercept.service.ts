import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModel } from './modules/auth/_models/auth.model';
import { HandleHttpMessageServiceService } from './modules/partials/_services/handle-http-message-service.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(private handleMessage: HandleHttpMessageServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.has('Authorization')) {
      return next.handle(request);
    }

    const authLocalStorageToken = localStorage.getItem(this.authLocalStorageToken) || '';
    let auth: AuthModel;
    if (authLocalStorageToken) {
      auth = JSON.parse(authLocalStorageToken);
    }

    let authenticationRequest = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'),
    });

    if (auth && auth.authToken) {
      authenticationRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${auth.authToken}`),
      });
    }

    if (request.headers.has('Content-Type')) {
      authenticationRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${auth?.authToken}`),
      });
    }

    return next.handle(authenticationRequest).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && request.method !== 'GET') {
          // this.handleMessage.showSuccess('Thao tác thành công!');
        }
      }),
      catchError((err) => {
        if (request.method !== 'GET') {
          this.handleMessage.showError(err.error.message);
        }
        return throwError(err);
      }),
    );
  }
}
