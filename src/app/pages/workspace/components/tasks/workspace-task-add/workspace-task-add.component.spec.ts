import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceTaskAddComponent } from './workspace-task-add.component';

describe('WorkspaceTaskAddComponent', () => {
  let component: WorkspaceTaskAddComponent;
  let fixture: ComponentFixture<WorkspaceTaskAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceTaskAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceTaskAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
