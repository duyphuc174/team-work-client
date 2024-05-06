import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceTaskListComponent } from './workspace-task-list.component';

describe('WorkspaceTaskListComponent', () => {
  let component: WorkspaceTaskListComponent;
  let fixture: ComponentFixture<WorkspaceTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceTaskListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
