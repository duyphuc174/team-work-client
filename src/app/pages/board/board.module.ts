import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardWorkListComponent } from './components/board-work-list/board-work-list.component';
import { BoardWorkListItemComponent } from './components/board-work-list-item/board-work-list-item.component';

@NgModule({
  declarations: [BoardComponent, BoardWorkListComponent, BoardWorkListItemComponent],
  imports: [CommonModule, BoardRoutingModule, DragDropModule],
})
export class BoardModule {}
