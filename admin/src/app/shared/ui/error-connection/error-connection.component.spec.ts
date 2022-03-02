import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorConnectionComponent } from './error-connection.component';

describe('ErrorConnectionComponent', () => {
  let component: ErrorConnectionComponent;
  let fixture: ComponentFixture<ErrorConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
