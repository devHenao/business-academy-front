import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { StudentPopupComponent } from '../pages/student/student-popup/student-popup.component';
import StudentComponent from '../pages/student/lis-student/student.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popupComponentRef: any;
  private currentStudent: any; // <-- Almacena los datos del estudiante aquí

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  openPopup(student?: any, getData?: () => void) {
    this.currentStudent = student; // <-- Guarda los datos del estudiante

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(StudentPopupComponent);
    this.popupComponentRef = componentFactory.create(this.injector);

    if (student) {
      this.popupComponentRef.instance.editStudent(student);
    }

    this.popupComponentRef.instance.getData = getData;

    this.popupComponentRef.instance.closePopup.subscribe(() => this.closePopup());

    this.appRef.attachView(this.popupComponentRef.hostView);

    const domElem = (this.popupComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  getCurrentStudent() {
    return this.currentStudent; // <-- Método para obtener los datos del estudiante
  }

  closePopup() {
    if (this.popupComponentRef) {
      this.appRef.detachView(this.popupComponentRef.hostView);
      this.popupComponentRef.destroy();
    }
  }
}
