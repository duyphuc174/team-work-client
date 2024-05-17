import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceMemberAddComponent } from './workspace-member-add.component';

describe('WorkspaceMemberAddComponent', () => {
  let component: WorkspaceMemberAddComponent;
  let fixture: ComponentFixture<WorkspaceMemberAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceMemberAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceMemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
