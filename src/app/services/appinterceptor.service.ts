import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {AuditService} from '../services/audit.service'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppinterceptorService implements HttpInterceptor {

  constructor(private auth: AuditService) { }
  handlError(error:HttpErrorResponse)
  {
    return throwError(error)
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const headers= new HttpHeaders(
      {
        Authorization: `Bearer ${this.auth.getToken()}`,
      }
    )
    const clone= req.clone({
      headers:headers
    })
   return next.handle(clone).pipe(
     catchError(error=>{
      if (error.status === 403) {
        this.auth.loggedOut();
        throw error;
      }
      else
      {
        throw error;
      }
     })
   );
  }
}
