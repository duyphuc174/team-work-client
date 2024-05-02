import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModel } from './modules/auth/_models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class InterceptService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor() {}

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

    return next.handle(authenticationRequest);
  }
}
