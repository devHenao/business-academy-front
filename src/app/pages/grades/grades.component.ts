import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { TableComponent } from '../../shared/table/table.component';
import { TitleComponent } from '../../shared/title/title.component';

@Component({
  selector: 'app-grades',
  imports: [TableComponent, TitleComponent,],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css',
})
export default class GradesComponent {
  private studentService_ = inject(StudentService);

  public listTBody: any[] = [];

  public listTHeader: any[] = [
    { key: 'first_name', label: 'Nombre' },
    { key: 'last_name', label: 'Apellido' },
    { key: 'email', label: 'Correo' },
    { key: 'avatar', label: 'Avatar' },
  ];

  constructor() {
    this.getGrades();
  }

  getGrades() {
    this.studentService_.getGrades().subscribe((res: any) => {
      this.listTBody = res.data;
      {
        (error: any) => {
          console.log(error);
        };
      }
    });
  }
}
