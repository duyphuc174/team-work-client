import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserActivityComponent } from './profile-user-activity.component';

describe('ProfileUserActivityComponent', () => {
  let component: ProfileUserActivityComponent;
  let fixture: ComponentFixture<ProfileUserActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUserActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
