import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
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
import { PopupService } from '../../../services/popup.service'; // <-- Importa el servicio
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-popup',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TitleComponent],
  templateUrl: './student-popup.component.html',
  styleUrl: './student-popup.component.css',
})
export class StudentPopupComponent {
  @Output() closePopup = new EventEmitter<void>();

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

  constructor(private _formBuilder: FormBuilder, private location: Location) {
    const student = this._popupService.getCurrentStudent();
    console.log('Datos del estudiante en el constructor:', student);

    this.formLogin = this._formBuilder.group({
      identification: ['', Validators.compose([
                            Validators.maxLength(30),
                            Validators.pattern(regExps['nit']),
        ]),
      ],
      name: ['', Validators.compose([
                  Validators.maxLength(30),
                  Validators.required]),
      ],
      lastName: ['', Validators.compose([
        Validators.maxLength(30)])],
      email: ['',Validators.compose([
                  Validators.maxLength(30),
                  Validators.required,
                  Validators.pattern(regExps['email']),
        ]),
      ],
      pageWeb: ['', Validators.compose([
                    Validators.maxLength(50)])],
      address: ['', Validators.compose([
                    Validators.maxLength(50)])],
    });

    if (student) {
      this.editStudent(student);
    }
  }

  editStudent(student: any) {
    this.accion = 'Editar Estudiante';
    this.id = student.id;

    this.formLogin.patchValue({
      identification: student.identification,
      name: student.first_name,
      lastName: student.last_name,
      email: student.email,
      pageWeb: student.avatar,
      address: student.address,
    });
  }

  saveStudent() {
    const student: any = {
      identification: this.formLogin.get('identification')?.value,
      name: this.formLogin.get('name')?.value,
      lastName: this.formLogin.get('lastName')?.value,
      email: this.formLogin.get('email')?.value,
      pageWeb: this.formLogin.get('pageWeb')?.value,
      address: this.formLogin.get('address')?.value,
    };

    if (this.id === undefined) {
      this._studentService.registerStudent(student).subscribe(
        (response: any) => {
          console.log('Estudiante guardado correctamente', response);
          this.formLogin.reset();
          this.close();
        },
        (error: any) => {
          console.error('Error al guardar el estudiante', error);
        }
      );
    } else {
      student.id = this.id;
      this._studentService.updateStudent(student.id, student).subscribe(
        () => {
          console.log('El estudiante fue actualizado correctamente');
          this.formLogin.reset();
          this.accion = 'Agregar Estudiante';
          this.id = undefined;
          this.close();
        },
        (err) => {
          console.log('Hubo un error al actualizar el estudiante', err);
        }
      );
    }
  }

}
