import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvatarInforComponent } from './user-avatar-infor.component';

describe('UserAvatarInforComponent', () => {
  let component: UserAvatarInforComponent;
  let fixture: ComponentFixture<UserAvatarInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAvatarInforComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAvatarInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
