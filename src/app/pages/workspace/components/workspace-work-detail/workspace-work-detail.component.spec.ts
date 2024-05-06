import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceWorkDetailComponent } from './workspace-work-detail.component';

describe('WorkspaceWorkDetailComponent', () => {
  let component: WorkspaceWorkDetailComponent;
  let fixture: ComponentFixture<WorkspaceWorkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceWorkDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceWorkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
