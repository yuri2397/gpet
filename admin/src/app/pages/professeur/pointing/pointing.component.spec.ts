import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointingComponent } from './pointing.component';

describe('PointingComponent', () => {
  let component: PointingComponent;
  let fixture: ComponentFixture<PointingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
