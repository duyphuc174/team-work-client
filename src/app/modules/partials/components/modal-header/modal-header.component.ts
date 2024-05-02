import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent {
  @Input() title: string;
  constructor(public dialogRef: MatDialogRef<any>) {}

  closeModal() {
    this.dialogRef.close();
  }
}
