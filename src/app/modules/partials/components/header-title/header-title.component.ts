import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss'],
})
export class HeaderTitleComponent {
  @Input() title: string;
  @Input() buttonName: string;
  @Input() buttonDelete: string;
  @Input() secondBreadcrumb: string;
  @Output() handleClick: EventEmitter<any> = new EventEmitter<any>(null);
  @Output() handleDelete: EventEmitter<any> = new EventEmitter<any>(null);

  onClick() {
    this.handleClick.emit();
  }

  onDelete() {
    this.handleDelete.emit();
  }
}
