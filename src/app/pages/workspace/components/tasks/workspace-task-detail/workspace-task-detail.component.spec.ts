import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceTaskDetailComponent } from './workspace-task-detail.component';

describe('WorkspaceTaskDetailComponent', () => {
  let component: WorkspaceTaskDetailComponent;
  let fixture: ComponentFixture<WorkspaceTaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceTaskDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
