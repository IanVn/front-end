import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegistroIntercept implements HttpInterceptor{

  constructor() { }

  // Tenemos que implementar el metodo intercept, tenemos que importarlo en los providers del modulo principal
  intercept( req: HttpRequest <any>, next: HttpHandler ): Observable<HttpEvent <any>> {

    return next.handle(req).pipe(
      tap( res => console.log('Ha pasado por el interceptor')),
      catchError( (err: HttpErrorResponse) => {
        if( err.status == 406) {
          console.log(err.error);
        }
        return throwError( err );
      } )
    );
  }

}
