import { inject, Injectable } from '@angular/core';
import { ExecuteTemplateGateway } from '../gateway/ExecuteTemplate.gateway.component';
import { IStudent } from '../Interfaces/students.response.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcecuteTemplateUseCase {
  executeTemplateGateway_ = inject(ExecuteTemplateGateway);

  execute(student: IStudent[]): Observable<any[]> {
    return this.executeTemplateGateway_.getAllStudents(student);
  }
}
