import { inject, Injectable } from '@angular/core';
import { ExecuteTemplateGateway } from '../gateway/ExecuteTemplate.gateway.component';
import { catchError, Observable, throwError } from 'rxjs';
import { IStudent, IStudentResponse } from '../Interfaces/students.response.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../env/enviroment.dev.component';

@Injectable({
  providedIn: 'root'
})

export class excecuteTemplateService extends ExecuteTemplateGateway {

  private Http = inject(HttpClient);
  private url = environment.apiUrlprueba;

  getAllStudents(student: IStudent[]): Observable<any[]> {
    console.log('Sending data to API:', student);
    return this.Http.get<any>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpResponse<any>) {

    console.log('Ah ocurrido un error', error);
    return throwError('Something went');
  }





}
