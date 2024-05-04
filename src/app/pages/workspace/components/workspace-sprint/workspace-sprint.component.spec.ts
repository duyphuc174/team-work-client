import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceSprintComponent } from './workspace-sprint.component';

describe('WorkspaceSprintComponent', () => {
  let component: WorkspaceSprintComponent;
  let fixture: ComponentFixture<WorkspaceSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceSprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
