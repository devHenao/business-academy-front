import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TitleComponent } from '../../../shared/title/title.component';
import {
  errorMessages,
  regExps,
} from '../../../../../core/global/utilities/validations.service';
import { PopupService } from '../../../services/popup.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-popup',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TitleComponent],
  templateUrl: './student-popup.component.html',
  styleUrl: './student-popup.component.css',
})
export class StudentPopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Input() getData!: () => void;  // Recibe la función getData

  close() {
    this.closePopup.emit();
  }

  public errors: any = errorMessages;
  public formLogin: any;
  public accion: string = 'Agregar Estudiante';
  private id: number | undefined;

  isVisible = false;

  show() {
    this.isVisible = true;
  }

  private _popupService = inject(PopupService);
  private _studentService = inject(StudentService);

  constructor(private _formBuilder: FormBuilder) {
    const student = this._popupService.getCurrentStudent();
    console.log('Datos del estudiante en el constructor:', student);

    this.formLogin = this._formBuilder.group({
      document: [Number, Validators.compose([
                          Validators.maxLength(30),
                          Validators.pattern(regExps['nit'])]),],
      firstName: ['', Validators.compose([
                Validators.maxLength(30),
                Validators.required]),],
      lastName: ['', Validators.compose([
               Validators.maxLength(30)]),],
      // email: ['', Validators.compose([
      //             Validators.maxLength(30),
      //             Validators.required,
      //             Validators.pattern(regExps['email'])
      // ]),],
      attendant: ['', Validators.compose([
                    Validators.maxLength(50)]),],
      address: ['', Validators.compose([
                    Validators.maxLength(50)]),],
      docType: ['', Validators.compose([
                    Validators.maxLength(50)]),],
      course: ['', Validators.compose([
                    Validators.maxLength(50)]),],
      city: ['', Validators.compose([
                  Validators.maxLength(50)]),],
      active: [ Validators.compose([
                    Validators.required]),],
      district: ['', Validators.compose([
                    Validators.required]),],
    });

    if (student) {
      this.editStudent(student);
    }
  }

  editStudent( student: any) {
    this.accion = 'Editar Estudiante'
    this.id = student.id

    this.formLogin.patchValue({
      document : student.document,
      firstName : student.firstName,
      lastName : student.lastName,
      email : student.email,
      attendant : student.attendant,
      address : student.address,
      district : student.district,
      docType : student.docType,
      course : student.course,
      city : student.city,
      active : student.active,
    })
  }

  saveStudent() {
    const student: any = {
      document : this.formLogin.get('document')?.value,
      firstName : this.formLogin.get('firstName')?.value,
      lastName : this.formLogin.get('lastName')?.value,
      // email : this.formLogin.get('email')?.value,
      attendant : this.formLogin.get('attendant')?.value,
      address : this.formLogin.get('address')?.value,
      district : this.formLogin.get('district')?.value,
      docType : this.formLogin.get('docType')?.value,
      course : this.formLogin.get('course')?.value,
      city : this.formLogin.get('city')?.value,
      active : this.formLogin.get('active')?.value,
    };


    if (this.id === undefined) {
      this._studentService.registerStudent(student).subscribe(
        (response: any) => {
          console.log('Estudiante guardado correctamente', response);
          this.formLogin.reset();
          this.close();
          if (this.getData) {
            this.getData();
          }
        },
        (error: any) => {
          console.error('Error al guardar el estudiante', error);
        }
      );
    } else {
      student.id = this.id;
      this._studentService.updateStudent(student).subscribe(
        () => {
          console.log('El estudiante fue actualizado correctamente');
          this.formLogin.reset();
          this.accion = 'Agregar Estudiante';
          this.id = undefined;
          this.close();
          if (this.getData) {
            this.getData();
          }
        },
        (err) => {
          console.log('Hubo un error al actualizar el estudiante', err);
        }
      );
    }
  }

}
