import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FileStorageModel } from 'src/app/pages/workspace/_models/work.model';
import { ModalConfirmDeleteComponent } from '../modal-confirm-delete/modal-confirm-delete.component';

@Component({
  selector: 'app-image-show',
  templateUrl: './image-show.component.html',
  styleUrls: ['./image-show.component.scss'],
})
export class ImageShowComponent {
  @ViewChild('detailImage') detailImage: TemplateRef<any>;
  @Input() file: FileStorageModel;
  @Input() size: { width: number; height: number } = { width: 200, height: 150 };
  @Input() showDeleteButton: any;
  @Output() handleDelete: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalService: BsModalService) {}

  showImage() {
    this.bsModalService.show(this.detailImage, { class: 'modal-lg' });
  }

  deleteFile() {
    const initialState = {
      idDelete: this.file.id,
      name: this.file.name,
    };
    const bsModalRef = this.bsModalService.show(ModalConfirmDeleteComponent, { initialState });
    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.handleDelete.emit(res);
      }
    });
  }
}
