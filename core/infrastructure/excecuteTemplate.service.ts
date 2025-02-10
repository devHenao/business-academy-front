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

  getAllStudents(): Observable<any> {
    return this.Http.get<any>(`${this.url}GetAllListStudents`)
    .pipe(catchError(this.handleError));
  }

  registerStudent(student: IStudent[]): Observable<any[]> {
    console.log('Sending data to API:', student);
    return this.Http.post<any>(`${this.url}CreateStudent`, student).pipe(
      catchError(this.handleError)
    );
  }

  updateStudent(student: IStudent[]): Observable<any[]> {
    console.log('Sending data to API:', student);
    return this.Http.put<any>(`${this.url}UpdateStudent`, student).pipe(
      catchError(this.handleError)
    );
  }

  deleteStudent(id: any): Observable<any[]> {
    return this.Http.delete<any>(`${this.url}DeleteStudentById/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpResponse<any>) {
    console.log('Ah ocurrido un error', error);
    return throwError('Something went');
  }
}
