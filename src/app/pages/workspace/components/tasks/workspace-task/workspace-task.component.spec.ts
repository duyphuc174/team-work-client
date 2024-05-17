import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceTaskComponent } from './workspace-task.component';

describe('WorkspaceTaskComponent', () => {
  let component: WorkspaceTaskComponent;
  let fixture: ComponentFixture<WorkspaceTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
