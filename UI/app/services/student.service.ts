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

   getStudents(){
    return this.Http.get<IStudentResponse>(this.url)
   }

   getGrades() {
    return this.Http.get<IStudentResponse>(this.url)
   }

   updateStudent(id: number, student: IStudent) {
    return this.Http.put<IStudentResponse>(`https://reqres.in/api/users/${id}`, student);
   }

   registerStudent(student: IStudent) {
    return this.Http.post<IStudentResponse>('https://reqres.in/api/users', student)
   }

   deleteStudent(id:any){
    return this.Http.delete<IStudentResponse>(`https://reqres.in/api/users/${id}`)
   }

}
