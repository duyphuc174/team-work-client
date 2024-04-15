import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceWorkListComponent } from './workspace-work-list.component';

describe('WorkspaceWorkListComponent', () => {
  let component: WorkspaceWorkListComponent;
  let fixture: ComponentFixture<WorkspaceWorkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceWorkListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
