import { Observable } from "rxjs";
import { IStudent } from "../Interfaces/students.response.component";



export abstract class ExecuteTemplateGateway {

  abstract executeTemplate(templateText: IStudent[]): Observable<any[]>;

}
