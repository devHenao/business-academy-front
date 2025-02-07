import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorServiceService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'token-usuario': 'ABCCCCCCCCCC212DA'
    })

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    );

  }

  manejarError( error: HttpErrorResponse ) {
    let errorMessage: string;

    switch (error.status) {
      case 400:
        errorMessage = 'Solicitud incorrecta. Por favor, verifica los datos e inténtalo de nuevo.';
        break;
      case 401:
        errorMessage = 'No estás autorizado. Por favor, vuelve a iniciar sesión.';
        break;
      case 403:
        errorMessage = 'Acceso prohibido. No tienes permisos para acceder a este recurso.';
        break;
      case 404:
        errorMessage = 'El recurso solicitado no se pudo encontrar.';
        break;
      case 500:
        errorMessage = 'Error interno en el servidor. Por favor, inténtalo más tarde.';
        break;
      default:
        errorMessage = 'Ocurrió un error inesperado. Por favor, inténtalo nuevamente.';
        break;
    }

    return throwError(errorMessage);
  }
}
