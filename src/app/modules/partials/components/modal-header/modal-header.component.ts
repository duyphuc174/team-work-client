import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent {
  @Input() title: string;
  constructor(public bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef?.hide();
  }
}
