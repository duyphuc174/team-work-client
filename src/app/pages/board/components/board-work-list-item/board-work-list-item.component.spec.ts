import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardWorkListItemComponent } from './board-work-list-item.component';

describe('BoardWorkListItemComponent', () => {
  let component: BoardWorkListItemComponent;
  let fixture: ComponentFixture<BoardWorkListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardWorkListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardWorkListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
