import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowComponent } from './user-show.component';

describe('UserShowComponent', () => {
  let component: UserShowComponent;
  let fixture: ComponentFixture<UserShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
