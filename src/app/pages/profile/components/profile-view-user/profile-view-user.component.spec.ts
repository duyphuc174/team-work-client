import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewUserComponent } from './profile-view-user.component';

describe('ProfileViewUserComponent', () => {
  let component: ProfileViewUserComponent;
  let fixture: ComponentFixture<ProfileViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileViewUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
