import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatimentShowComponent } from './batiment-show.component';

describe('BatimentShowComponent', () => {
  let component: BatimentShowComponent;
  let fixture: ComponentFixture<BatimentShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatimentShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatimentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
