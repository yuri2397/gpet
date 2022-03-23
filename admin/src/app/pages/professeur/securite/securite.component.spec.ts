import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuriteComponent } from './securite.component';

describe('SecuriteComponent', () => {
  let component: SecuriteComponent;
  let fixture: ComponentFixture<SecuriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecuriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
