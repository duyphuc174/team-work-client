import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInformationUpdateComponent } from './profile-information-update.component';

describe('ProfileInformationUpdateComponent', () => {
  let component: ProfileInformationUpdateComponent;
  let fixture: ComponentFixture<ProfileInformationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInformationUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInformationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
