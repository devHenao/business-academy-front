import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [RouterModule],
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() create: boolean = false;
  @Input() delete: boolean = false;
  @Input() update: boolean = false;
  @Input({ required: true }) acciones: boolean = false;
  @Input({ required: true}) listTHeader: any[] = [];
  @Input({ required: true }) listTBody: any[] = [];
  // @Input() popup: any;
  @Input() popupServices: any;
  @Input() deleteAction?: (id:number) => void;
  @Input() getData!: () => void;

  openStudentPopup(data: any) {
    this.popupServices.openPopup(data, this.getData);
  }

  deleteGeneric(id: number) {
    if (this.deleteAction) {
      this.deleteAction(id);
      this.getData();
    }
  }
}
