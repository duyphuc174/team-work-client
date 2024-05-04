import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceWorkCreateComponent } from './workspace-work-create.component';

describe('WorkspaceWorkCreateComponent', () => {
  let component: WorkspaceWorkCreateComponent;
  let fixture: ComponentFixture<WorkspaceWorkCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceWorkCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceWorkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
