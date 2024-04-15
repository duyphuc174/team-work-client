import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardWorkListComponent } from './board-work-list.component';

describe('BoardWorkListComponent', () => {
  let component: BoardWorkListComponent;
  let fixture: ComponentFixture<BoardWorkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardWorkListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
