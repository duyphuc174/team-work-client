import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceMemberListComponent } from './workspace-member-list.component';

describe('WorkspaceMemberListComponent', () => {
  let component: WorkspaceMemberListComponent;
  let fixture: ComponentFixture<WorkspaceMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceMemberListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
