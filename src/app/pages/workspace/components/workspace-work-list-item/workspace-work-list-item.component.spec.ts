import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceWorkListItemComponent } from './workspace-work-list-item.component';

describe('WorkspaceWorkListItemComponent', () => {
  let component: WorkspaceWorkListItemComponent;
  let fixture: ComponentFixture<WorkspaceWorkListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceWorkListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceWorkListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
