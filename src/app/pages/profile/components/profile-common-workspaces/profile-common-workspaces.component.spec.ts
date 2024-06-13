import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommonWorkspacesComponent } from './profile-common-workspaces.component';

describe('ProfileCommonWorkspacesComponent', () => {
  let component: ProfileCommonWorkspacesComponent;
  let fixture: ComponentFixture<ProfileCommonWorkspacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCommonWorkspacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCommonWorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
