import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTimeTableComponent } from './detail-time-table.component';

describe('DetailTimeTableComponent', () => {
  let component: DetailTimeTableComponent;
  let fixture: ComponentFixture<DetailTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTimeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
