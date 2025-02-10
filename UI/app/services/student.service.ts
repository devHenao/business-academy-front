import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../core/env/enviroment.dev.component';
import { IStudent, IStudentResponse } from '../../../core/domain/Interfaces/students.response.component';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private Http = inject(HttpClient);
  private url = environment.apiUrlprueba;
  private urls = environment.apiUrlpruebas;

   getStudents(){
    return this.Http.get<any>(`${this.url}GetAllListStudents`)
   }

   getGrades() {
    return this.Http.get<any>(`${this.urls}`)
   }

   updateStudent(student: IStudent) {
    return this.Http.put<any>(`${this.url}UpdateStudent`, student);
   }

   registerStudent(student: IStudent) {
    return this.Http.post<any>(`${this.url}CreateStudent`, student)
   }

   deleteStudent(id:any){
    return this.Http.delete<any>(`${this.url}DeleteStudentById/${id}`)
   }

}
