import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss'],
})
export class HeaderTitleComponent {
  @Input() breadcrumbTemplate: TemplateRef<any>;
  @Input() buttonName: string;
  @Output() handleClick: EventEmitter<any> = new EventEmitter<any>(null);

  onClick() {
    this.handleClick.emit();
  }
}
