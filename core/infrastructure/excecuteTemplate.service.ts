import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../env/enviroment.dev.component';
import { IStudent } from '../domain/Interfaces/students.response.component';
import { ExecuteTemplateGateway } from '../domain/gateway/ExecuteTemplate.gateway.component';

@Injectable({
  providedIn: 'root',
})
export class excecuteTemplateService extends ExecuteTemplateGateway {
  private Http = inject(HttpClient);
  private url = environment.apiUrlprueba;

  getAllStudents(student: IStudent[]): Observable<any[]> {
    console.log('Sending data to API:', student);
    return this.Http.get<any>(this.url)
    .pipe(catchError(this.handleError));
  }

  registerStudent(student: IStudent[]): Observable<any[]> {
    console.log('Sending data to API:', student);
    return this.Http.post<any>('https://reqres.in/api/users', student).pipe(
      catchError(this.handleError)
    );
  }

  updateStudent(student: IStudent[]): Observable<any[]> {
    console.log('Sending data to API:', student);
    // return this.Http.put<any>(`https://reqres.in/api/users/${id}`, student)
    return this.Http.put<any>(`https://reqres.in/api/users`, student).pipe(
      catchError(this.handleError)
    );
  }

  deleteStudent(student: IStudent[]): Observable<any[]> {
    console.log('Sending data to API:', student);
    // return this.Http.delete<any>(`https://reqres.in/api/users/${id}`)
    return this.Http.delete<any>(`https://reqres.in/api/users`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpResponse<any>) {
    console.log('Ah ocurrido un error', error);
    return throwError('Something went');
  }
}
