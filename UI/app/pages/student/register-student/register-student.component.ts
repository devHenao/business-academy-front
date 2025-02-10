import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { errorMessages, regExps } from '../../../../../core/global/utilities/validations.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentService } from '../../../services/student.service';
import { TitleComponent } from '../../../shared/title/title.component';
import StudentComponent from '../lis-student/student.component';

@Component({
  selector: 'app-register-student',
  imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            TitleComponent
            ],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css'
})

export default class RegisterStudentComponent {
  public errors: any = errorMessages;
  public formLogin: any;
  public accion: string = 'Agregar Estudiante';
  private studiante: any;
  private id:number | undefined;


  isVisible = false;

  show() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  private _studentService = inject(StudentService);

  constructor(
    private _formBuilder: FormBuilder,
    private location: Location,
    private StudentComponent: StudentComponent

  ) {

    this.formLogin = this._formBuilder.group({
      identification: ['', Validators.compose([
                          Validators.maxLength(30),
                          Validators.pattern(regExps['nit'])
      ]),
      ],
      name: ['', Validators.compose([
                Validators.maxLength(30),
                Validators.required]),

      ],
      lastName: ['', Validators.compose([
               Validators.maxLength(30)]),
      ],
      // email: ['', Validators.compose([
      //             Validators.maxLength(30),
      //             Validators.required,
      //             Validators.pattern(regExps['email'])
      // ]),],
      attendant: ['', Validators.compose([
                    Validators.maxLength(50)]),
      ],
      address: ['', Validators.compose([
                    Validators.maxLength(50)]),
      ],
      docType: ['', Validators.compose([
        Validators.maxLength(50)]),
      ],
      course: ['', Validators.compose([
        Validators.maxLength(50)]),
      ],
      city: ['', Validators.compose([
        Validators.maxLength(50)]),
      ],
      active: ['', Validators.compose([
        Validators.required]),
      ],
      district: ['', Validators.compose([
        Validators.required]),
      ],
    });

  }

  editStudent( student: any) {
    this.accion = 'Editar Estudiante'
    this.id = student.id

    this.formLogin.patchValue({
      identification : student.document,
      name : student.firstName,
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
      identification: this.formLogin.get('identification')?.value,
      name: this.formLogin.get('name')?.value,
      lastName: this.formLogin.get('lastName')?.value,
      email: this.formLogin.get('email')?.value,
      pageWeb: this.formLogin.get('pageWeb')?.value,
      address: this.formLogin.get('address')?.value,
    };

    // if (this.id === undefined) {
    //   this._studentService.saveStudent(student).subscribe(
    //     (response: any) => {
    //       console.log('Estudiante guardado correctamente', response);
    //       this.formLogin.reset();
    //       this.getStudent();
    //     },
    //     (error: any) => {
    //       console.error('Error al guardar el estudiante', error);
    //     }
    //   );
    // } else {
    //   student.id = this.id;
    //   this._studentService.updateStudents(student.id, student).subscribe(
    //     () => {
    //       console.log('El estudiante fue actualizado correctamente');
    //       this.formLogin.reset();
    //       this.accion = 'Agregar Estudiante';
    //       this.id = undefined;
    //       this.getStudent();
    //     },
    //     (err) => {
    //       console.log('Hubo un error al actualizar el estudiante', err);
    //     }
    //   );
    // }
  }

  goBack() {
    this.location.back()
  }

  // getStudent() {
  //   this._studentService.getStudents().subscribe(
  //     (data: any) => {
  //       this.listStudent = data.data;
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
