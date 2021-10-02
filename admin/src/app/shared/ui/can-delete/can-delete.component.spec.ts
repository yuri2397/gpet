import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanDeleteComponent } from './can-delete.component';

describe('CanDeleteComponent', () => {
  let component: CanDeleteComponent;
  let fixture: ComponentFixture<CanDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
