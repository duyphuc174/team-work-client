import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-confirm-delete',
  templateUrl: './modal-confirm-delete.component.html',
  styleUrls: ['./modal-confirm-delete.component.scss'],
})
export class ModalConfirmDeleteComponent {
  idDelete: number = 0;
  name: string;
  onClose$: Subject<any> = new Subject<any>();

  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    this.onClose$.next(this.idDelete);
    this.bsModalRef?.hide();
  }

  decline() {
    this.bsModalRef?.hide();
  }
}
