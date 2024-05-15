import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FileStorageModel } from 'src/app/pages/workspace/_models/work.model';

@Component({
  selector: 'app-image-show',
  templateUrl: './image-show.component.html',
  styleUrls: ['./image-show.component.scss'],
})
export class ImageShowComponent {
  @ViewChild('detailImage') detailImage: TemplateRef<any>;
  @Input() file: FileStorageModel;
  @Input() size: { width: number; height: number } = { width: 200, height: 150 };

  constructor(private bsModalService: BsModalService) {}

  showImage() {
    this.bsModalService.show(this.detailImage, { class: 'modal-lg' });
  }
}
