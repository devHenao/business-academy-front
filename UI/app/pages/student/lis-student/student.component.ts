import { Component, computed, inject, signal } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import { StudentService } from '../../../services/student.service';
import { State } from '../../../../../core/domain/Interfaces/students.response.component';
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
    { key: 'firstName' , label: 'Nombre' },
    { key: 'lastName', label: 'Apellido' },
    { key: 'docType', label: 'Tipo Documento' },
    { key: 'document' , label: 'Documento' },
    { key: 'course' , label: 'Curso' },
    // { key: 'email', label: 'Correo' },
    { key: 'address' , label: 'Dirección' },
    { key: 'city' , label: 'Ciudad' },
    { key: 'district' , label: 'Barrio' },
    { key: 'attendant' , label: 'Acudiente' },
    { key: 'active' , label: 'Estado' },
  ];

  constructor(){
    this.getStudents();
    console.log(this.listTHeader);

  }

  getStudents() {
    this.studentService_.getStudents().subscribe(res => {
      this.#state.set({
        loading: false,
        student: res,
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
