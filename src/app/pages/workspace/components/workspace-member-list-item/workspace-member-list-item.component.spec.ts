import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceMemberListItemComponent } from './workspace-member-list-item.component';

describe('WorkspaceMemberListItemComponent', () => {
  let component: WorkspaceMemberListItemComponent;
  let fixture: ComponentFixture<WorkspaceMemberListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceMemberListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceMemberListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
