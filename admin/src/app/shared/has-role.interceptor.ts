import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HasRoleInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        return this.errorHandle(error);
      })
    );
  }

  private errorHandle(
    error: HttpErrorResponse
  ): Observable<HttpEvent<unknown>> {
    if (error.status == 403) {
      this.router.navigate(['/admin/unauthorized']);
    }
    return throwError(error);
  }
}
