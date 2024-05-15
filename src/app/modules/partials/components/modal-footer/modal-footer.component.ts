import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent {
  @Input() confirmText: string = 'Tạo mới';
  @Input() disabled: boolean | any = false;
  @Input() isLoading$: Observable<boolean>;
  @Output() handleClick: EventEmitter<any> = new EventEmitter<any>(null);

  onClick() {
    this.handleClick.emit();
  }
}
