import { Component, computed, inject, signal } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import { StudentService } from '../../../services/student.service';
import { State } from '../../../core/domain/Interfaces/students.response.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/table/table.component';
import { Studentroutes } from '../../app.student.routes';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-student',
  imports: [TitleComponent, CommonModule, TableComponent],
  templateUrl: './student.component.html',
})
export default class StudentComponent {

  popupService_ = inject(PopupService)

  #state = signal<State>({
    loading: true,
    student: []
  })

  public student = computed( () => this.#state().student );
  public loading = computed( () => this.#state().loading );

  public studentService_ = inject(StudentService);

  public listTHeader: any[] = [
    { key: 'first_name' , label: 'Nombre' },
    { key: 'last_name', label: 'Apellido' },
    { key: 'last_name', label: 'Tipo Documento' },
    { key: 'id' , label: 'Documento' },
    { key: 'first_name' , label: 'Grado' },
    { key: 'email', label: 'Correo' },
    { key: 'first_name' , label: 'Dirección' },
    { key: 'first_name' , label: 'Ciudad' },
    { key: 'first_name' , label: 'Barrio' },
    { key: 'first_name' , label: 'Acudiente' },
    { key: 'id' , label: 'Estado' },
  ];

  constructor(){
    this.getStudents();
  }

  getStudents() {
    this.studentService_.getStudents().subscribe(res => {
      this.#state.set({
        loading: false,
        student: res.data,
      });
      console.log(res);
    });
  }

  deleteStudent(id: number) {
    this.studentService_.deleteStudent(id).subscribe(
      (response: any) => {
        console.log('Estudiante eliminado correctamente', response);
        this.getStudents();
      },
      (error: any) => {
        console.error('Error al eliminar el estudiante', error);
      }
    );
  }

}
