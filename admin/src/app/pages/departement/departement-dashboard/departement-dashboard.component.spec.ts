import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementDashboardComponent } from './departement-dashboard.component';

describe('DepartementDashboardComponent', () => {
  let component: DepartementDashboardComponent;
  let fixture: ComponentFixture<DepartementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartementDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
