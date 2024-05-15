import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceWorkComponent } from './workspace-work.component';

describe('WorkspaceWorkComponent', () => {
  let component: WorkspaceWorkComponent;
  let fixture: ComponentFixture<WorkspaceWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
