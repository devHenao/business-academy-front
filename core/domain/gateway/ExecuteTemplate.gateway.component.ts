import { Observable } from 'rxjs';
import { IStudent } from '../Interfaces/students.response.component';

export abstract class ExecuteTemplateGateway {
  abstract getAllStudents(templateText: IStudent[]): Observable<any[]>;
  abstract registerStudent(templateText: IStudent[]): Observable<any[]>;
  abstract updateStudent(templateText: IStudent[]): Observable<any[]>;
  abstract deleteStudent(templateText: IStudent[]): Observable<any[]>;
}
