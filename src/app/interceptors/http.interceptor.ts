import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = localStorage.getItem('authToken');
    console.log(authToken, 'from interceptor');

    if (authToken) {
      console.log(authToken, 'from inteceptor');

      let authReq = req.clone({

        headers: req.headers.set(
          'Authorization', 'Bearer ' + authToken
      )
      
      });
      console.log(authReq, 'with token');
      return next.handle(authReq);
    } else {
      let authReq = req.clone({})
      console.log(authReq, 'no token');
      return next.handle(authReq);
    }

  }
}

