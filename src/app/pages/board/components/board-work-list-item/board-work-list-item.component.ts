import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board-work-list-item',
  templateUrl: './board-work-list-item.component.html',
  styleUrls: ['./board-work-list-item.component.scss'],
})
export class BoardWorkListItemComponent {
  @Input() name: string;
}
