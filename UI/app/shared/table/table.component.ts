import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { PopupService } from '../../services/popup.service';

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


  openStudentPopup(data: any) {
    this.popupServices.openPopup(data);
  }

  deleteGeneric(id: number) {
    if (this.deleteAction) {
      this.deleteAction(id);
    }
  }
}
